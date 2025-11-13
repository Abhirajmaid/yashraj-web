'use client';

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC7iDeaDSPX9Qz8mGZn3saaNP44u3MbY8E',
  authDomain: 'yashraj-infrastructure.firebaseapp.com',
  projectId: 'yashraj-infrastructure',
  storageBucket: 'yashraj-infrastructure.firebasestorage.app',
  messagingSenderId: '698056438215',
  appId: '1:698056438215:web:f26486ea9a0ff75bd6a9e2',
  measurementId: 'G-9N0YLQXPHT',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        getAnalytics(app);
      }
    })
    .catch(() => {
      // Analytics not critical; ignore errors in unsupported environments.
    });
}

export default app;



