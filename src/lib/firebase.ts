import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  initializeFirestore,
  enableNetwork,
  disableNetwork,
  doc,
  getDocFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
// Long-polling يُفعَّل تلقائياً خلف الوكلاء وبيئات المعاينة والشبكات التي تحجب WebChannel
export const db = initializeFirestore(
  app,
  { experimentalAutoDetectLongPolling: true },
  firebaseConfig.firestoreDatabaseId
);

// إيقاف شبكة Firestore فور فقدان الاتصال حتى لا تتراكم محاولات WebChannel الفاشلة
if (typeof window !== 'undefined') {
  window.addEventListener('offline', () => {
    void disableNetwork(db).catch(() => {});
  });
  window.addEventListener('online', () => {
    void enableNetwork(db).catch(() => {});
  });
  if (navigator.onLine === false) {
    void disableNetwork(db).catch(() => {});
  }
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map(provider => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    console.log('[Firebase] Initializing secure connection...');
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    const msg = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
    // إذا رد الخادم برفض الصلاحية لمستند الفحص الوهمي فهذا يعني أن الاتصال بالخادم نشط وسليم 100%
    if (msg.includes('permission') || msg.includes('insufficient')) {
      console.log('[Firebase] Secure connection verified (RBAC active).');
      return;
    }
    if (msg.includes('offline') || msg.includes('unavailable') || msg.includes('network')) {
      console.warn('[Firebase] Operating in Offline-First Mode due to network restrictions.');
    }
  }
}

void testConnection();


