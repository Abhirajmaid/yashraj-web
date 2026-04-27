'use client';

import { db } from '@/lib/firebaseClient';
import { CreateCareerApplicationPayload, CareerApplicationRecord } from '@/types/career';
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

export const CAREER_COLLECTION = 'careerApplications';

const careerCollection = collection(db, CAREER_COLLECTION);

type FirestoreCareerData = {
  fullName?: string;
  email?: string;
  phone?: string;
  position?: string;
  experience?: string;
  location?: string;
  coverLetter?: string;
  resumeLink?: string;
  createdAt?: { seconds: number; nanoseconds: number };
  updatedAt?: { seconds: number; nanoseconds: number };
};

function convertTimestampToIso(timestamp?: { seconds: number; nanoseconds: number }) {
  if (!timestamp) return null;
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
  return date.toISOString();
}

function deserializeCareerDoc(
  snapshot: QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>
): CareerApplicationRecord {
  const data = snapshot.data() as FirestoreCareerData | undefined;

  return {
    id: snapshot.id,
    fullName: data?.fullName ?? '',
    email: data?.email ?? '',
    phone: data?.phone ?? '',
    position: data?.position ?? '',
    experience: data?.experience ?? '',
    location: data?.location ?? '',
    coverLetter: data?.coverLetter ?? '',
    resumeLink: data?.resumeLink ?? '',
    createdAt: convertTimestampToIso(data?.createdAt),
    updatedAt: convertTimestampToIso(data?.updatedAt),
  };
}

export async function createCareerApplication(payload: CreateCareerApplicationPayload): Promise<void> {
  await addDoc(careerCollection, {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export function listenToCareerApplications(
  onData: (records: CareerApplicationRecord[]) => void,
  onError: (error: Error) => void
) {
  try {
    const careersQuery = query(careerCollection, orderBy('createdAt', 'desc'));
    return onSnapshot(
      careersQuery,
      (snapshot) => {
        const mapped = snapshot.docs.map((doc) => deserializeCareerDoc(doc));
        onData(mapped);
      },
      (firebaseError) => {
        const message = firebaseError instanceof Error ? firebaseError.message : String(firebaseError);
        onError(new Error(message || 'Failed to load career applications.'));
      }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    onError(new Error(`Failed to set up career listener: ${msg}`));
    return () => {};
  }
}
