'use client';

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC7iDeaDSPX9Qz8mGZn3saaNP44u3MbY8E',
  authDomain: 'yashraj-infrastructure.firebaseapp.com',
  projectId: 'yashraj-infrastructure',
  storageBucket: 'yashraj-infrastructure.appspot.com',
  messagingSenderId: '698056438215',
  appId: '1:698056438215:web:f26486ea9a0ff75bd6a9e2',
  measurementId: 'G-9N0YLQXPHT',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only in browser and if available
if (typeof window !== 'undefined') {
  // Dynamically import analytics to avoid SSR issues
  import('firebase/analytics')
    .then((analytics) => {
      analytics.isSupported()
        .then((supported: boolean) => {
          if (supported) {
            analytics.getAnalytics(app);
          }
        })
        .catch(() => {
          // Analytics not critical; ignore errors in unsupported environments.
        });
    })
    .catch(() => {
      // Firebase Analytics package not available, skip initialization
    });
}

export default app;



