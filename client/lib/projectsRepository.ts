'use client';

import { db } from '@/lib/firebaseClient';
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
  DocumentSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import {
  CreateProjectPayload,
  FeatureImageMap,
  ProjectRecord,
  ProjectStatus,
  UpdateProjectPayload,
} from '@/types/project';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

export const PROJECTS_COLLECTION = 'projects';

const projectsCollection = collection(db, PROJECTS_COLLECTION);

type FirestoreProjectData = {
  name?: string;
  overview?: string;
  essentials?: string[];
  images?: string[];
  // Legacy fields – kept for reading old documents
  featureImages?: Partial<FeatureImageMap>;
  gallery?: string[];
  status?: ProjectStatus;
  location?: string;
  category?: string;
  segment?: string;
  price?: string;
  inventory?: number;
  statement?: string;
  description?: string;
  industries?: string[];
  highlights?: string;
  launchWindow?: string;
  deliveryWindow?: string;
  builder?: string;
  consultants?: string;
  financing?: string;
  progress?: number;
  createdAt?: { seconds: number; nanoseconds: number };
  updatedAt?: { seconds: number; nanoseconds: number };
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 80);
}

function randomId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2, 10);
}

export async function createProjectRecord(payload: CreateProjectPayload): Promise<ProjectRecord> {
  console.log('[createProjectRecord] Starting project creation...', { projectName: payload.name });

  try {
    const projectSlug = slugify(payload.name || randomId());

    const imageFiles = payload.imageFiles ?? [];
    let images: string[] = [];

    if (imageFiles.length) {
      try {
        console.log('[createProjectRecord] Uploading images...', { count: imageFiles.length });
        images = await Promise.all(
          imageFiles.map(async (file, index) => {
            const folder = index === 0 ? `projects/${projectSlug}/primary` : `projects/${projectSlug}/gallery`;
            const result = await uploadImageToCloudinary(file, { folder });
            console.log(`[createProjectRecord] Image ${index + 1} uploaded`);
            return result.secureUrl;
          })
        );
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to upload images: ${msg}`);
      }
    }

    const nowIso = new Date().toISOString();
    const overviewValue = payload.overview?.trim() ?? '';
    const essentialsValue = payload.essentials ?? [];

    let docRef;
    try {
      const docData: Record<string, unknown> = {
        name: payload.name,
        overview: overviewValue,
        essentials: essentialsValue,
        images,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      if (payload.category != null && payload.category !== '') docData.category = payload.category;
      if (payload.location != null && payload.location.trim() !== '') docData.location = payload.location.trim();
      if (payload.launchWindow != null && payload.launchWindow.trim() !== '') docData.launchWindow = payload.launchWindow.trim();
      if (payload.deliveryWindow != null && payload.deliveryWindow.trim() !== '') docData.deliveryWindow = payload.deliveryWindow.trim();
      if (payload.builder != null && payload.builder.trim() !== '') docData.builder = payload.builder.trim();
      if (payload.consultants != null && payload.consultants.trim() !== '') docData.consultants = payload.consultants.trim();
      if (payload.financing != null && payload.financing.trim() !== '') docData.financing = payload.financing.trim();
      if (payload.progress != null && typeof payload.progress === 'number' && !Number.isNaN(payload.progress)) docData.progress = payload.progress;

      docRef = await addDoc(projectsCollection, docData);
      console.log('[createProjectRecord] Saved to Firestore', { id: docRef.id });
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      if (msg.includes('permission') || msg.includes('Permission')) {
        throw new Error(`Firestore permission denied: ${msg}`);
      }
      throw new Error(`Failed to save project to Firestore: ${msg}`);
    }

    return {
      id: docRef.id,
      name: payload.name,
      overview: overviewValue,
      essentials: essentialsValue,
      images,
      createdAt: nowIso,
      updatedAt: nowIso,
      industries: [],
      category: payload.category || undefined,
      location: payload.location?.trim() || undefined,
      launchWindow: payload.launchWindow?.trim() || undefined,
      deliveryWindow: payload.deliveryWindow?.trim() || undefined,
      builder: payload.builder?.trim() || undefined,
      consultants: payload.consultants?.trim() || undefined,
      financing: payload.financing?.trim() || undefined,
      progress: payload.progress != null && typeof payload.progress === 'number' && !Number.isNaN(payload.progress) ? payload.progress : null,
    };
  } catch (error) {
    console.error('[createProjectRecord] Fatal error:', error);
    if (error instanceof Error) throw error;
    throw new Error(`Failed to create project record: ${String(error)}`);
  }
}

export async function updateProjectRecord(
  projectId: string,
  payload: UpdateProjectPayload
): Promise<ProjectRecord> {
  console.log('[updateProjectRecord] Updating project...', { projectId });

  const docRef = doc(db, PROJECTS_COLLECTION, projectId);

  let images = payload.currentImages ?? [];

  if (payload.newImageFiles?.length) {
    try {
      console.log('[updateProjectRecord] Uploading new images...', { count: payload.newImageFiles.length });
      const uploaded = await Promise.all(
        payload.newImageFiles.map(async (file, index) => {
          const result = await uploadImageToCloudinary(file, {
            folder: `projects/${projectId}/gallery`,
          });
          console.log(`[updateProjectRecord] New image ${index + 1} uploaded`);
          return result.secureUrl;
        })
      );
      images = [...images, ...uploaded];
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to upload new images: ${msg}`);
    }
  }

  const updateData: Record<string, unknown> = {
    images,
    updatedAt: serverTimestamp(),
  };

  if (typeof payload.name === 'string') updateData.name = payload.name.trim();
  if (typeof payload.overview === 'string') updateData.overview = payload.overview.trim();
  if (payload.essentials) updateData.essentials = payload.essentials;
  if (payload.category !== undefined) updateData.category = payload.category || null;
  if (payload.location !== undefined) updateData.location = payload.location?.trim() || null;
  if (payload.launchWindow !== undefined) updateData.launchWindow = payload.launchWindow?.trim() || null;
  if (payload.deliveryWindow !== undefined) updateData.deliveryWindow = payload.deliveryWindow?.trim() || null;
  if (payload.builder !== undefined) updateData.builder = payload.builder?.trim() || null;
  if (payload.consultants !== undefined) updateData.consultants = payload.consultants?.trim() || null;
  if (payload.financing !== undefined) updateData.financing = payload.financing?.trim() || null;
  if (payload.progress !== undefined) updateData.progress = payload.progress != null && typeof payload.progress === 'number' && !Number.isNaN(payload.progress) ? payload.progress : null;

  await updateDoc(docRef, updateData);
  const updatedSnapshot = await getDoc(docRef);
  console.log('[updateProjectRecord] Project updated successfully');

  return deserializeProjectDoc(updatedSnapshot);
}

export async function deleteProjectRecord(projectId: string): Promise<void> {
  console.log('[deleteProjectRecord] Deleting project…', { projectId });
  await deleteDoc(doc(db, PROJECTS_COLLECTION, projectId));
  console.log('[deleteProjectRecord] Project deleted');
}

export async function getProjectRecord(
  projectId: string | string[]
): Promise<ProjectRecord | null> {
  const id = Array.isArray(projectId) ? projectId[0] : projectId;
  if (!id) return null;

  const docRef = doc(db, PROJECTS_COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return deserializeProjectDoc(snapshot);
}

function convertTimestampToIso(timestamp?: { seconds: number; nanoseconds: number }) {
  if (!timestamp) return null;
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
  return date.toISOString();
}

export function deserializeProjectDoc(
  snapshot: QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>
): ProjectRecord {
  const data = snapshot.data() as FirestoreProjectData | undefined;

  // Build the flat images array: use new `images` field if present,
  // otherwise derive from legacy featureImages + gallery for backward compat.
  let images: string[] = [];
  if (data?.images && Array.isArray(data.images) && data.images.length > 0) {
    images = data.images;
  } else {
    // Legacy document – reconstruct a deduplicated flat list
    const seen = new Set<string>();
    const add = (url?: string) => {
      if (url && url.trim() !== '' && !seen.has(url)) {
        seen.add(url);
        images.push(url);
      }
    };
    add(data?.featureImages?.primary);
    add(data?.featureImages?.lifestyle);
    add(data?.featureImages?.city);
    (data?.gallery ?? []).forEach(add);
  }

  return {
    id: snapshot.id,
    name: data?.name ?? '',
    overview: data?.overview ?? '',
    essentials: data?.essentials ?? [],
    images,
    status: data?.status,
    location: data?.location,
    category: data?.category,
    segment: data?.segment,
    price: data?.price,
    inventory: typeof data?.inventory === 'number' ? data?.inventory : null,
    statement: data?.statement,
    description: data?.description,
    industries: data?.industries ?? [],
    highlights: data?.highlights,
    launchWindow: data?.launchWindow,
    deliveryWindow: data?.deliveryWindow,
    builder: data?.builder,
    consultants: data?.consultants,
    financing: data?.financing,
    progress: typeof data?.progress === 'number' ? data?.progress : null,
    createdAt: convertTimestampToIso(data?.createdAt),
    updatedAt: convertTimestampToIso(data?.updatedAt),
  };
}

export function listenToProjects(
  onData: (projects: ProjectRecord[]) => void,
  onError: (error: Error) => void
) {
  try {
    const projectsQuery = query(projectsCollection, orderBy('createdAt', 'desc'));

    return onSnapshot(
      projectsQuery,
      (snapshot) => {
        const mapped = snapshot.docs.map((doc) => deserializeProjectDoc(doc));
        onData(mapped);
      },
      (firebaseError) => {
        const errorMessage = firebaseError instanceof Error ? firebaseError.message : String(firebaseError);
        let userFriendlyMessage = errorMessage;
        if (errorMessage.includes('permission') || errorMessage.includes('Permission')) {
          userFriendlyMessage = `Firestore permission denied: ${errorMessage}. Please update Firestore security rules.`;
        } else if (errorMessage.includes('index') || errorMessage.includes('Index')) {
          userFriendlyMessage = `Firestore index required: ${errorMessage}. Please create a composite index on 'createdAt'.`;
        }
        onError(
          firebaseError instanceof Error
            ? new Error(userFriendlyMessage)
            : new Error(userFriendlyMessage || 'Failed to load projects.')
        );
      }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    onError(new Error(`Failed to set up projects listener: ${msg}`));
    return () => {};
  }
}
