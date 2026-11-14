import { initializeApp, getApps, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import firebaseConfig from '../../firebase-applet-config.json';

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    projectId: firebaseConfig.projectId,
  });
} else {
  app = getApps()[0];
}

export const adminAuth: Auth = getAuth(app);
