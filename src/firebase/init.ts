
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

export function initializeFirebase(): { app: FirebaseApp | null; auth: Auth | null; firestore: Firestore | null } {
  if (firebaseConfig?.apiKey) {
    const apps = getApps();
    const app = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    return { app, auth, firestore };
  }
  return { app: null, auth: null, firestore: null };
}
