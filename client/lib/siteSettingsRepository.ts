'use client';

import { db } from '@/lib/firebaseClient';
import { SiteSettings, UpdateSiteSettingsPayload } from '@/types/siteSettings';
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

export const SITE_SETTINGS_COLLECTION = 'siteSettings';
export const SITE_SETTINGS_DOC_ID = 'global';

const siteSettingsRef = doc(db, SITE_SETTINGS_COLLECTION, SITE_SETTINGS_DOC_ID);

type FirestoreSiteSettingsData = {
  portfolioLink?: string;
  brochureLink?: string;
  updatedAt?: { seconds: number; nanoseconds: number };
};

function convertTimestampToIso(timestamp?: { seconds: number; nanoseconds: number }) {
  if (!timestamp) return null;
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
  return date.toISOString();
}

export function deserializeSiteSettingsDoc(
  snapshot: DocumentSnapshot<DocumentData>
): SiteSettings {
  const data = snapshot.data() as FirestoreSiteSettingsData | undefined;

  return {
    portfolioLink: data?.portfolioLink?.trim() ?? '',
    brochureLink: data?.brochureLink?.trim() ?? '',
    updatedAt: convertTimestampToIso(data?.updatedAt),
  };
}

export function listenToSiteSettings(
  onData: (settings: SiteSettings) => void,
  onError: (error: Error) => void
) {
  try {
    return onSnapshot(
      siteSettingsRef,
      (snapshot) => {
        onData(deserializeSiteSettingsDoc(snapshot));
      },
      (firebaseError) => {
        const message = firebaseError instanceof Error ? firebaseError.message : String(firebaseError);
        onError(new Error(message || 'Failed to load site settings.'));
      }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    onError(new Error(`Failed to set up site settings listener: ${msg}`));
    return () => {};
  }
}

export async function updateSiteSettings(payload: UpdateSiteSettingsPayload): Promise<void> {
  const updateData: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  if (payload.portfolioLink !== undefined) {
    updateData.portfolioLink = payload.portfolioLink.trim();
  }
  if (payload.brochureLink !== undefined) {
    updateData.brochureLink = payload.brochureLink.trim();
  }

  await setDoc(siteSettingsRef, updateData, { merge: true });
}

export function isValidExternalUrl(url: string): boolean {
  if (!url.trim()) return true;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
