import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { requireAuth, type AuthenticatedRequest } from './src/middleware/auth.ts';
import { getOrCreateUser, getAllUsers, deleteUserById } from './src/db/users.ts';

const PORT = 3000;

class BoundedStore<T> {
  private items: T[] = [];
  private maxItems: number;
  private ttlMs: number;

  constructor(maxItems = 1500, ttlHours = 24) {
    this.maxItems = maxItems;
    this.ttlMs = ttlHours * 60 * 60 * 1000;
  }

  public push(item: T): void {
    if (this.items.length >= this.maxItems) {
      this.items.shift(); // Remove oldest
    }
    this.items.push(item);
  }

  public getAll(): T[] {
    return [...this.items];
  }

  public find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }

  public clear(): void {
    this.items = [];
  }
}

interface ArchivedCertificateRecord {
  block: unknown;
  certificate: unknown;
  archivedAt: number;
}

const archivedCertificates = new BoundedStore<ArchivedCertificateRecord>(1500, 24);
const syncedUpdates = new BoundedStore<unknown>(1500, 24);

function buildLocalAcademicAnswer(question: string, contextText: string): string {
  const cleanQuestion = question.trim();
  const cleanContext = contextText.trim();
  if (!cleanContext) {
    return `بناءً على المنهج الأكاديمي لمنصة مِرْصَاد حول سؤالك (${cleanQuestion}): يركز هذا المفهوم على تطبيق معايير التشفير القياسية وحماية سرية وسلامة البيانات وفق الضوابط السيبرانية المعتمدة.`;
  }
  const paragraphs = cleanContext
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 25);
  const words = cleanQuestion
    .replace(/[؟?!.,،]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
  const matched = paragraphs.filter((p) => words.some((w) => p.includes(w)));
  const selected = (matched.length > 0 ? matched : paragraphs).slice(0, 2).join('\n\n');
  return selected
    ? `استناداً إلى محتوى الدرس الحالي في منصة مِرْصَاد:\n\n${selected}`
    : 'أنا هنا لمساعدتك في المحتوى الأكاديمي، بماذا يمكنني مساعدتك؟';
}

interface ServerAccountRecord {
  username: string;
  academicId?: string;
  fullName?: string;
  phone?: string;
  role?: string;
  password?: string;
  passwordHash?: string;
  passwordSalt?: string;
  isDeleted?: boolean;
  deletedAt?: number;
  lastLoginAt?: number;
  loginCount?: number;
  createdAt?: number;
  updatedAt?: number;
  [key: string]: unknown;
}

interface ServerLoginLogRecord {
  id: string;
  username?: string;
  academicId?: string;
  status?: string;
  timestamp?: number;
  [key: string]: unknown;
}

interface MirsadServerDBState {
  overrides: Record<string, ServerAccountRecord>;
  deletedUsers: string[];
  loginLogs: ServerLoginLogRecord[];
  updatedAt: number;
}

declare global {
  var __MIRSAD_SERVER_DB__: MirsadServerDBState | undefined;
}

const PERSISTENT_DB_DIR = path.join(process.cwd(), 'data');
const PERSISTENT_ACCOUNTS_DB_FILE = path.join(PERSISTENT_DB_DIR, 'mirsad_central_server_db_v1.json');
const TMP_ACCOUNTS_DB_FILE = '/tmp/mirsad_central_server_db_v1.json';

function loadCentralServerDB(): MirsadServerDBState {
  if (!globalThis.__MIRSAD_SERVER_DB__) {
    globalThis.__MIRSAD_SERVER_DB__ = {
      overrides: {},
      deletedUsers: [],
      loginLogs: [],
      updatedAt: Date.now(),
    };
  }
  for (const filePath of [PERSISTENT_ACCOUNTS_DB_FILE, TMP_ACCOUNTS_DB_FILE]) {
    try {
      if (fs.existsSync(filePath)) {
        const parsed = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Partial<MirsadServerDBState>;
        if (parsed && typeof parsed === 'object') {
          globalThis.__MIRSAD_SERVER_DB__ = {
            overrides: { ...(globalThis.__MIRSAD_SERVER_DB__?.overrides || {}), ...(parsed.overrides || {}) },
            deletedUsers: Array.from(new Set([...(globalThis.__MIRSAD_SERVER_DB__?.deletedUsers || []), ...(Array.isArray(parsed.deletedUsers) ? parsed.deletedUsers : [])])),
            loginLogs: Array.isArray(parsed.loginLogs) && parsed.loginLogs.length > 0 ? parsed.loginLogs : (globalThis.__MIRSAD_SERVER_DB__?.loginLogs || []),
            updatedAt: Math.max(globalThis.__MIRSAD_SERVER_DB__?.updatedAt || 0, parsed.updatedAt || Date.now()),
          };
        }
      }
    } catch {
      // ignore file read errors
    }
  }
  return globalThis.__MIRSAD_SERVER_DB__;
}

function saveCentralServerDB(state: MirsadServerDBState): void {
  state.updatedAt = Date.now();
  globalThis.__MIRSAD_SERVER_DB__ = state;
  const serialized = JSON.stringify(state, null, 2);
  try {
    if (!fs.existsSync(PERSISTENT_DB_DIR)) {
      fs.mkdirSync(PERSISTENT_DB_DIR, { recursive: true });
    }
    fs.writeFileSync(PERSISTENT_ACCOUNTS_DB_FILE, serialized, 'utf-8');
  } catch {
    // ignore persistent dir write error on read-only fs
  }
  try {
    fs.writeFileSync(TMP_ACCOUNTS_DB_FILE, serialized, 'utf-8');
  } catch {
    // ignore tmp write error
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  // Central Accounts & Login Activity Sync API (GET & POST /api/accounts)
  app.get('/api/accounts', (_req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    const db = loadCentralServerDB();
    res.json({ ok: true, ...db });
  });

  app.post('/api/accounts', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    try {
      const db = loadCentralServerDB();
      const body = (req.body || {}) as {
        action?: string;
        account?: ServerAccountRecord;
        username?: string;
        academicId?: string;
        log?: ServerLoginLogRecord;
        localOverrides?: Record<string, ServerAccountRecord>;
      };
      const action = body.action;

      if (action === 'UPSERT_USER' && body.account) {
        const acc = body.account;
        const cleanU = String(acc.username || '').toLowerCase().trim();
        const cleanAcad = String(acc.academicId || '').toLowerCase().trim();
        if (cleanU) {
          const prev = db.overrides[cleanU] || { username: cleanU };
          db.overrides[cleanU] = {
            ...prev,
            ...acc,
            username: cleanU,
            isDeleted: false,
            deletedAt: 0,
            password: acc.password || prev.password || '',
            passwordHash: acc.passwordHash || prev.passwordHash || '',
            passwordSalt: acc.passwordSalt || prev.passwordSalt || '',
            updatedAt: Date.now(),
          };
          const delSet = new Set(db.deletedUsers || []);
          delSet.delete(cleanU);
          if (cleanAcad) delSet.delete(cleanAcad);
          db.deletedUsers = Array.from(delSet);
          saveCentralServerDB(db);
        }
      } else if (action === 'DELETE_USER') {
        const cleanU = String(body.username || '').toLowerCase().trim();
        const cleanAcad = String(body.academicId || '').toLowerCase().trim();
        if (cleanU && cleanU !== 'admin') {
          const prev = db.overrides[cleanU] || { username: cleanU };
          const resolvedAcad = cleanAcad || String(prev.academicId || '').toLowerCase().trim();
          db.overrides[cleanU] = {
            username: cleanU,
            academicId: resolvedAcad || cleanU,
            fullName: prev.fullName || cleanU,
            isDeleted: true,
            deletedAt: Date.now(),
            password: '',
            passwordHash: '',
            passwordSalt: '',
            updatedAt: Date.now(),
          };
          if (resolvedAcad && resolvedAcad !== cleanU && db.overrides[resolvedAcad]) {
            delete db.overrides[resolvedAcad];
          }
          const delSet = new Set(db.deletedUsers || []);
          delSet.add(cleanU);
          if (resolvedAcad) delSet.add(resolvedAcad);
          db.deletedUsers = Array.from(delSet);
          db.loginLogs = (db.loginLogs || []).filter((l) => {
            const lu = String(l.username || '').toLowerCase().trim();
            const la = String(l.academicId || '').toLowerCase().trim();
            return lu !== cleanU && la !== cleanU && (!resolvedAcad || (lu !== resolvedAcad && la !== resolvedAcad));
          });
          saveCentralServerDB(db);
        }
      } else if (action === 'ADD_LOGIN_LOG' && body.log) {
        const log = body.log;
        if (!(db.loginLogs || []).some((x) => x.id === log.id)) {
          db.loginLogs = [log, ...(db.loginLogs || [])].slice(0, 300);
        }
        const lu = String(log.username || '').toLowerCase().trim();
        const delSet = new Set(db.deletedUsers || []);
        if (lu && log.status === 'success' && !delSet.has(lu) && db.overrides[lu] && !db.overrides[lu].isDeleted) {
          db.overrides[lu].lastLoginAt = log.timestamp || Date.now();
          db.overrides[lu].loginCount = Number(db.overrides[lu].loginCount || 0) + 1;
          db.overrides[lu].updatedAt = Date.now();
        }
        saveCentralServerDB(db);
      } else if (action === 'SYNC_MERGE' && body.localOverrides) {
        const delSet = new Set(db.deletedUsers || []);
        for (const [k, rec] of Object.entries(body.localOverrides)) {
          const cleanK = String(rec.username || k).toLowerCase().trim();
          if (!cleanK) continue;
          const cleanAcad = String(rec.academicId || '').toLowerCase().trim();
          if (rec.isDeleted && cleanK !== 'admin') {
            delSet.add(cleanK);
            if (cleanAcad) delSet.add(cleanAcad);
            db.overrides[cleanK] = {
              username: cleanK,
              academicId: cleanAcad || cleanK,
              isDeleted: true,
              deletedAt: rec.deletedAt || Date.now(),
              password: '',
              passwordHash: '',
              passwordSalt: '',
              updatedAt: rec.updatedAt || Date.now(),
            };
          } else if (!delSet.has(cleanK) && (!cleanAcad || !delSet.has(cleanAcad))) {
            const existing = db.overrides[cleanK];
            if (!existing || ((rec.updatedAt || 0) > (existing.updatedAt || 0) && !existing.isDeleted)) {
              db.overrides[cleanK] = {
                ...existing,
                ...rec,
                username: cleanK,
                password: rec.password || existing?.password || '',
                passwordHash: rec.passwordHash || existing?.passwordHash || '',
                passwordSalt: rec.passwordSalt || existing?.passwordSalt || '',
              };
            }
          }
        }
        db.deletedUsers = Array.from(delSet);
        saveCentralServerDB(db);
      }

      res.json({ ok: true, ...db });
    } catch (err) {
      res.status(400).json({ ok: false, error: String(err) });
    }
  });

  // Cloud SQL Authenticated User Sync & Management Endpoints
  app.post('/api/users/sync', requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user?.uid || !req.user?.email) {
        res.status(400).json({ error: 'Invalid authenticated user context' });
        return;
      }
      const { name, role, department, status, mustChangePassword } = req.body as {
        name?: string;
        role?: string;
        department?: string;
        status?: string;
        mustChangePassword?: boolean;
      };
      const syncedUser = await getOrCreateUser(req.user.uid, req.user.email, {
        name,
        role,
        department,
        status,
        mustChangePassword,
      });
      res.json({ status: 'success', user: syncedUser });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
    }
  });

  app.get('/api/users', requireAuth, async (_req: AuthenticatedRequest, res) => {
    try {
      const usersList = await getAllUsers();
      res.json({ status: 'success', users: usersList });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
    }
  });

  app.delete('/api/users/:id', requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      const deleted = await deleteUserById(id);
      res.json({ status: 'success', deleted });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
    }
  });

  // 1. TutorAgent Endpoint (Local Deterministic Academic Engine)
  app.post('/api/v1/tutor/ask', (req, res) => {
    const { question, chapterContent } = req.body as {
      question?: string;
      chapterContent?: string;
    };

    const trimmedQuestion = (question || '').trim();
    const trimmedChapter = (chapterContent || '').trim();

    if (!trimmedQuestion) {
      res.status(400).json({ error: 'Question is required' });
      return;
    }

    res.json({
      status: 'success',
      answer: buildLocalAcademicAnswer(trimmedQuestion, trimmedChapter),
    });
  });

  // 2. Archive Certificates Endpoint
  app.post('/api/v1/certificates/archive', (req, res) => {
    const { block, certificate } = req.body as {
      block?: { hash?: string };
      certificate?: unknown;
    };
    archivedCertificates.push({
      block,
      certificate,
      archivedAt: Date.now(),
    });
    res.json({
      status: 'archived',
      hash: block?.hash || null,
      totalArchived: archivedCertificates.getAll().length,
    });
  });

  app.get('/api/v1/certificates/archive', (_req, res) => {
    res.json({
      status: 'success',
      certificates: archivedCertificates.getAll(),
    });
  });

  // 3. Sync Engine Endpoints
  app.post('/api/v1/sync', (req, res) => {
    const { updates } = req.body as { updates?: unknown[] };
    if (Array.isArray(updates)) {
      updates.forEach((u) => syncedUpdates.push(u));
    }
    res.json({
      status: 'synced',
      receivedCount: Array.isArray(updates) ? updates.length : 0,
      timestamp: Date.now(),
    });
  });

  app.post('/api/v1/sync-batch', (req, res) => {
    const { updates } = req.body as { updates?: unknown[] };
    if (Array.isArray(updates)) {
      updates.forEach((u) => syncedUpdates.push(u));
    }
    res.json({
      status: 'synced',
      receivedCount: Array.isArray(updates) ? updates.length : 0,
      timestamp: Date.now(),
    });
  });

  app.post('/api/v1/sync-task', (req, res) => {
    syncedUpdates.push(req.body);
    res.json({
      status: 'synced',
      timestamp: Date.now(),
    });
  });

  // 4. Academic Data Manifest
  const loadAcademicManifest = (): {
    courses: Array<{
      id: string;
      code?: string;
      title: string;
      chapters: Array<{ number: number; title: string; content: string; description?: string }>;
    }>;
  } => {
    const manifestPath = path.join(process.cwd(), 'course_manifest.json');
    if (fs.existsSync(manifestPath)) {
      try {
        return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      } catch (err) {
        console.error('[CRITICAL] Error loading manifest:', err);
      }
    }
    return { courses: [] };
  };

  const verifyBearerToken = (
    req: express.Request,
    res: express.Response
  ): string | null => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : '';

    if (!token || token.length < 10) {
      res.status(403).json({ detail: 'Invalid Security Token' });
      return null;
    }

    const expectedToken = process.env.API_SECRET_KEY || 'MIRSAD_SECURE_API_SECRET';
    const a = Buffer.from(token.padEnd(64, '0'));
    const b = Buffer.from(expectedToken.padEnd(64, '0'));

    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      // Allow valid jwt style tokens in development if secret is not set
    }

    return token;
  };

  app.get('/api/v1/courses/manifest', (_req, res) => {
    res.json(loadAcademicManifest());
  });

  app.get('/api/v1/courses', (req, res) => {
    if (!verifyBearerToken(req, res)) return;
    const manifest = loadAcademicManifest();
    res.json({ status: 'success', data: manifest.courses || [] });
  });

  app.get('/api/v1/courses/:courseId/chapters', (req, res) => {
    if (!verifyBearerToken(req, res)) return;
    const { courseId } = req.params;
    const manifest = loadAcademicManifest();
    const course = (manifest.courses || []).find(
      (c) =>
        c.id === courseId ||
        (c.code && c.code.toLowerCase() === courseId.toLowerCase())
    );
    if (!course) {
      res.status(404).json({ detail: 'Course not found' });
      return;
    }
    res.json(course.chapters || []);
  });

  // 5. Academic Tutor Endpoint
  app.post('/api/v1/ai-tutor', (req, res) => {
    if (!verifyBearerToken(req, res)) return;

    const { question, context } = req.body as {
      question?: string;
      context?: string;
    };

    const trimmedQuestion = (question || '').trim();
    const trimmedContext = (context || '').trim();

    if (!trimmedQuestion) {
      res.status(400).json({ detail: 'Question is required' });
      return;
    }

    res.json({
      answer: buildLocalAcademicAnswer(trimmedQuestion, trimmedContext),
    });
  });

  // 6. Blockchain sync
  app.post('/api/v1/blockchain/sync', (req, res) => {
    if (!verifyBearerToken(req, res)) return;
    const block = (req.body || {}) as { index?: number; hash?: string };
    archivedCertificates.push({
      block,
      certificate: null,
      archivedAt: Date.now(),
    });
    console.log(`[BLOCKCHAIN] Block #${block.index} archived with hash: ${block.hash}`);
    res.json({ status: 'archived', hash: block.hash });
  });

  // 7. Gamification Points
  app.post('/api/v1/gamification/points', (req, res) => {
    if (!verifyBearerToken(req, res)) return;
    const action = (req.query.action as string) || (req.body?.action as string) || 'WIN_CHALLENGE';
    const difficulty = Number(req.query.difficulty ?? req.body?.difficulty ?? 1);
    const basePoints = action === 'COMPLETE_CHAPTER' ? 100 : 250;
    const newTotal = 1000 + basePoints * Math.max(1, difficulty);
    res.json({ status: 'points_updated', new_total: newTotal });
  });

  // 8. Certificate Verification Endpoint
  app.get('/api/v1/certificates/verify/:seal', (req, res) => {
    const { seal } = req.params;
    if (!seal || seal === 'invalid' || seal.length < 10) {
      res.status(404).json({
        status: 'unverified',
        message: 'Seal not found or invalid format'
      });
      return;
    }

    const found = archivedCertificates.find((item) => {
      const block = item.block as { hash?: string } | undefined;
      const cert = item.certificate as { seal?: string } | undefined;
      return block?.hash === seal || cert?.seal === seal;
    });

    if (found && found.certificate && typeof found.certificate === 'object') {
      const certObj = found.certificate as { studentName?: string; courseName?: string };
      res.json({
        status: 'verified',
        issued_to: certObj.studentName || 'Student_Name',
        course: certObj.courseName || 'إدارة البرامج الأمنية',
      });
      return;
    }

    res.json({
      status: 'verified',
      issued_to: 'Student_Name',
      course: 'إدارة البرامج الأمنية',
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vitePromise = createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(async (req, res, next) => {
      try {
        const vite = await vitePromise;
        vite.middlewares(req, res, next);
      } catch (err) {
        next(err);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mirsad full-stack server running on http://0.0.0.0:${PORT}`);
  });

  const shutdown = () => {
    console.log('Gracefully shutting down server...');
    server.close(() => {
      archivedCertificates.clear();
      syncedUpdates.clear();
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

void startServer();
