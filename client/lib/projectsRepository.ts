'use client';

import { db, storage } from '@/lib/firebaseClient';
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
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  CreateProjectPayload,
  FeatureImageMap,
  ProjectRecord,
  ProjectStatus,
} from '@/types/project';

export const PROJECTS_COLLECTION = 'projects';

const projectsCollection = collection(db, PROJECTS_COLLECTION);

type FirestoreProjectData = {
  code?: string;
  name?: string;
  industries?: string[];
  status?: ProjectStatus;
  category?: string;
  segment?: string;
  price?: string;
  inventory?: number;
  location?: string;
  progress?: number;
  builder?: string;
  consultants?: string;
  launchWindow?: string;
  deliveryWindow?: string;
  financing?: string;
  highlights?: string;
  description?: string;
  statement?: string;
  essentials?: string[];
  featureImages?: Partial<FeatureImageMap>;
  gallery?: string[];
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

async function uploadImage(path: string, file: File) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function createProjectRecord(payload: CreateProjectPayload): Promise<ProjectRecord> {
  const projectSlug = slugify(payload.code || payload.name || randomId());

  const featureUploads = await Promise.all(
    (Object.entries(payload.featureFiles) as [keyof FeatureImageMap, File][]).map(
      async ([key, file]) => {
        const downloadUrl = await uploadImage(
          `projects/${projectSlug}/feature-${key}-${randomId()}`,
          file
        );

        return [key, downloadUrl] as const;
      }
    )
  );

  const galleryUploads = await Promise.all(
    payload.galleryFiles.map((file) => uploadImage(`projects/${projectSlug}/gallery-${randomId()}`, file))
  );

  const featureImages = featureUploads.reduce<FeatureImageMap>(
    (acc, [key, url]) => ({ ...acc, [key]: url }),
    {
      primary: '',
      lifestyle: '',
      city: '',
    }
  );

  const nowIso = new Date().toISOString();

  const docRef = await addDoc(projectsCollection, {
    code: payload.code,
    name: payload.name,
    industries: payload.industries,
    status: payload.status,
    category: payload.category,
    segment: payload.segment,
    price: payload.price,
    inventory: payload.inventory,
    location: payload.location,
    progress: payload.progress,
    builder: payload.builder,
    consultants: payload.consultants,
    launchWindow: payload.launchWindow,
    deliveryWindow: payload.deliveryWindow,
    financing: payload.financing,
    highlights: payload.highlights,
    description: payload.description,
    statement: payload.statement,
    essentials: payload.essentials,
    featureImages,
    gallery: galleryUploads,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    code: payload.code,
    name: payload.name,
    industries: payload.industries,
    status: payload.status,
    category: payload.category,
    segment: payload.segment,
    price: payload.price,
    inventory: payload.inventory,
    location: payload.location,
    progress: payload.progress,
    builder: payload.builder,
    consultants: payload.consultants,
    launchWindow: payload.launchWindow,
    deliveryWindow: payload.deliveryWindow,
    financing: payload.financing,
    highlights: payload.highlights,
    description: payload.description,
    statement: payload.statement,
    essentials: payload.essentials,
    featureImages,
    gallery: galleryUploads,
    createdAt: nowIso,
    updatedAt: nowIso,
  };
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
    code: data?.code ?? '',
    name: data?.name ?? '',
    industries: data?.industries ?? [],
    status: data?.status ?? 'draft',
    category: data?.category ?? '',
    segment: data?.segment ?? '',
    price: data?.price ?? '',
    inventory: data?.inventory ?? 0,
    location: data?.location ?? '',
    progress: data?.progress ?? 0,
    builder: data?.builder ?? '',
    consultants: data?.consultants ?? '',
    launchWindow: data?.launchWindow ?? '',
    deliveryWindow: data?.deliveryWindow ?? '',
    financing: data?.financing ?? '',
    highlights: data?.highlights ?? '',
    description: data?.description ?? '',
    statement: data?.statement ?? '',
    essentials: data?.essentials ?? [],
    featureImages: {
      primary: data?.featureImages?.primary ?? '',
      lifestyle: data?.featureImages?.lifestyle ?? '',
      city: data?.featureImages?.city ?? '',
    },
    gallery: data?.gallery ?? [],
    createdAt: convertTimestampToIso(data?.createdAt),
    updatedAt: convertTimestampToIso(data?.updatedAt),
  };
}

export function listenToProjects(
  onData: (projects: ProjectRecord[]) => void,
  onError: (error: Error) => void
) {
  const projectsQuery = query(projectsCollection, orderBy('createdAt', 'desc'));

  return onSnapshot(
    projectsQuery,
    (snapshot) => {
      const mapped = snapshot.docs.map((doc) => deserializeProjectDoc(doc));
      onData(mapped);
    },
    (firebaseError) => {
      onError(
        firebaseError instanceof Error
          ? firebaseError
          : new Error('Failed to load projects from Firebase.')
      );
    }
  );
}


