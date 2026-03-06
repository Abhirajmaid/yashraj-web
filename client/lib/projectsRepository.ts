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
    console.log('[createProjectRecord] Generated project slug:', projectSlug);

    const featureFiles = payload.featureFiles ?? {};
    let featureUploads: Array<[keyof FeatureImageMap, string]> = [];
    if (Object.keys(featureFiles).length) {
      try {
        console.log('[createProjectRecord] Uploading feature images...', { count: Object.keys(featureFiles).length });
        featureUploads = await Promise.all(
          (Object.entries(featureFiles) as [keyof FeatureImageMap, File | undefined][])
            .filter((entry): entry is [keyof FeatureImageMap, File] => Boolean(entry[1]))
            .map(async ([key, file]) => {
              console.log(`[createProjectRecord] Uploading feature image: ${key}`, { fileName: file.name, size: file.size });
              const uploadResult = await uploadImageToCloudinary(file, {
                folder: `projects/${projectSlug}/feature`,
              });
              console.log(`[createProjectRecord] Feature image uploaded: ${key}`, { url: uploadResult.secureUrl });
              return [key, uploadResult.secureUrl] as const;
            })
        );
        console.log('[createProjectRecord] Feature image upload complete', { successCount: featureUploads.length });
      } catch (error) {
        console.error('[createProjectRecord] Error uploading feature images:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to upload feature images: ${errorMessage}`);
      }
    } else {
      console.log('[createProjectRecord] Skipping feature image uploads (none provided)');
    }

    const galleryFiles = payload.galleryFiles ?? [];
    let galleryUploads: string[] = [];
    if (galleryFiles.length) {
      try {
        console.log('[createProjectRecord] Uploading gallery images...', { count: galleryFiles.length });
        galleryUploads = await Promise.all(
          galleryFiles.map(async (file, index) => {
            console.log(`[createProjectRecord] Uploading gallery image ${index + 1}`, { fileName: file.name, size: file.size });
            const uploadResult = await uploadImageToCloudinary(file, {
              folder: `projects/${projectSlug}/gallery`,
            });
            console.log(`[createProjectRecord] Gallery image ${index + 1} uploaded`, { url: uploadResult.secureUrl });
            return uploadResult.secureUrl;
          })
        );
        console.log('[createProjectRecord] All gallery images uploaded successfully');
      } catch (error) {
        console.error('[createProjectRecord] Error uploading gallery images:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to upload gallery images: ${errorMessage}`);
      }
    } else {
      console.log('[createProjectRecord] Skipping gallery upload (no images provided)');
    }

    let featureImages = featureUploads.reduce<FeatureImageMap>(
      (acc, [key, url]) => ({ ...acc, [key]: url }),
      {
        primary: '',
        lifestyle: '',
        city: '',
      }
    );

    // If lifestyle / city images weren't uploaded explicitly, fall back to the
    // first two gallery images so the project detail page has rich visuals.
    if (!featureImages.lifestyle && galleryUploads[0]) {
      featureImages = { ...featureImages, lifestyle: galleryUploads[0] };
    }
    if (!featureImages.city && galleryUploads[1]) {
      featureImages = { ...featureImages, city: galleryUploads[1] };
    }

    const nowIso = new Date().toISOString();

    // Save project document to Firestore
    let docRef;
    const overviewValue = payload.overview?.trim() ?? '';
    const essentialsValue = payload.essentials ?? [];

    try {
      console.log('[createProjectRecord] Saving project to Firestore...', {
        name: payload.name,
        overview: overviewValue,
        essentialsCount: essentialsValue.length,
        galleryCount: galleryUploads.length,
      });
      
      const docData: Record<string, unknown> = {
        name: payload.name,
        overview: overviewValue,
        essentials: essentialsValue,
        featureImages,
        gallery: galleryUploads,
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
      
      console.log('[createProjectRecord] Project saved to Firestore successfully!', { documentId: docRef.id });
    } catch (error) {
      console.error('[createProjectRecord] Error saving to Firestore:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      // Check for permission errors
      if (errorMessage.includes('permission') || errorMessage.includes('Permission')) {
        throw new Error(`Firestore permission denied: ${errorMessage}. Please update Firestore security rules to allow writes to the 'projects' collection.`);
      }
      throw new Error(`Failed to save project to Firestore: ${errorMessage}`);
    }

    const projectRecord: ProjectRecord = {
      id: docRef.id,
      name: payload.name,
      overview: overviewValue,
      essentials: essentialsValue,
      featureImages,
      gallery: galleryUploads,
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

    console.log('[createProjectRecord] Project record created successfully!', { projectId: projectRecord.id });
    return projectRecord;
  } catch (error) {
    // Re-throw with better context
    console.error('[createProjectRecord] Fatal error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to create project record: ${String(error)}`);
  }
}

export async function updateProjectRecord(
  projectId: string,
  payload: UpdateProjectPayload
): Promise<ProjectRecord> {
  console.log('[updateProjectRecord] Updating project...', { projectId });

  const docRef = doc(db, PROJECTS_COLLECTION, projectId);
  let featureImages: FeatureImageMap = { ...payload.currentFeatureImages };

  const featureEntries = Object.entries(payload.featureFiles ?? {}).filter(
    (entry): entry is [keyof FeatureImageMap, File] => Boolean(entry[1])
  );

  if (featureEntries.length) {
    try {
      console.log('[updateProjectRecord] Uploading updated feature images...', { count: featureEntries.length });
      const uploads = await Promise.all(
        featureEntries.map(async ([key, file]) => {
          const uploadResult = await uploadImageToCloudinary(file, {
            folder: `projects/${projectId}/feature`,
          });
          return [key, uploadResult.secureUrl] as const;
        })
      );
      featureImages = uploads.reduce<FeatureImageMap>(
        (acc, [key, url]) => ({ ...acc, [key]: url }),
        featureImages
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to update feature images: ${message}`);
    }
  }

  let galleryImages = payload.currentGallery ?? [];
  if (payload.galleryFiles?.length) {
    try {
      console.log('[updateProjectRecord] Uploading replacement gallery images...', {
        count: payload.galleryFiles.length,
      });
      galleryImages = await Promise.all(
        payload.galleryFiles.map(async (file, index) => {
          const uploadResult = await uploadImageToCloudinary(file, {
            folder: `projects/${projectId}/gallery`,
          });
          console.log('[updateProjectRecord] Gallery image uploaded', { index: index + 1 });
          return uploadResult.secureUrl;
        })
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to update gallery images: ${message}`);
    }
  }

  const updateData: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  if (typeof payload.name === 'string') {
    updateData.name = payload.name.trim();
  }

  if (typeof payload.overview === 'string') {
    updateData.overview = payload.overview.trim();
  }

  if (payload.essentials) {
    updateData.essentials = payload.essentials;
  }

  updateData.featureImages = featureImages;
  updateData.gallery = galleryImages;

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
  if (!id) {
    return null;
  }

  const docRef = doc(db, PROJECTS_COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    return null;
  }
  return deserializeProjectDoc(snapshot);
}

function convertTimestampToIso(timestamp?: { seconds: number; nanoseconds: number }) {
  if (!timestamp) {
    return null;
  }

  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
  return date.toISOString();
}

export function deserializeProjectDoc(
  snapshot: QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>
): ProjectRecord {
  const data = snapshot.data() as FirestoreProjectData | undefined;

  return {
    id: snapshot.id,
    name: data?.name ?? '',
    overview: data?.overview ?? '',
    essentials: data?.essentials ?? [],
    featureImages: {
      primary: data?.featureImages?.primary ?? '',
      lifestyle: data?.featureImages?.lifestyle ?? '',
      city: data?.featureImages?.city ?? '',
    },
    gallery: data?.gallery ?? [],
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
        
        // Provide more helpful error messages
        let userFriendlyMessage = errorMessage;
        if (errorMessage.includes('permission') || errorMessage.includes('Permission')) {
          userFriendlyMessage = `Firestore permission denied: ${errorMessage}. Please update Firestore security rules to allow reads from the 'projects' collection.`;
        } else if (errorMessage.includes('index') || errorMessage.includes('Index')) {
          userFriendlyMessage = `Firestore index required: ${errorMessage}. Please create a composite index for 'projects' collection on 'createdAt' field in descending order.`;
        }
        
        onError(
          firebaseError instanceof Error
            ? new Error(userFriendlyMessage)
            : new Error(userFriendlyMessage || 'Failed to load projects from Firebase.')
        );
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    onError(new Error(`Failed to set up projects listener: ${errorMessage}`));
    // Return a no-op unsubscribe function
    return () => {};
  }
}


