// File: netlify/functions/accounts.mjs
import fs from 'node:fs';

const DB_FILE = '/tmp/mirsad_central_server_db_v1.json';

function loadServerDB() {
  if (!globalThis.__MIRSAD_SERVER_DB__) {
    globalThis.__MIRSAD_SERVER_DB__ = {
      overrides: {},
      deletedUsers: [],
      loginLogs: [],
      resetAt: 0,
      updatedAt: Date.now(),
    };
  }
  try {
    if (fs.existsSync(DB_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      if (parsed && typeof parsed === 'object') {
        globalThis.__MIRSAD_SERVER_DB__ = {
          overrides: parsed.overrides || {},
          deletedUsers: Array.isArray(parsed.deletedUsers) ? parsed.deletedUsers : [],
          loginLogs: Array.isArray(parsed.loginLogs) ? parsed.loginLogs : [],
          resetAt: Number(parsed.resetAt || 0),
          updatedAt: parsed.updatedAt || Date.now(),
        };
      }
    }
  } catch {}
  return globalThis.__MIRSAD_SERVER_DB__;
}

function saveServerDB(state) {
  state.updatedAt = Date.now();
  globalThis.__MIRSAD_SERVER_DB__ = state;
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(state), 'utf-8');
  } catch {}
}

export const handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Cache-Control, Pragma, Authorization',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  const db = loadServerDB();

  if (event.httpMethod === 'GET') {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, ...db }) };
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}');
      const action = body.action;

      if (action === 'RESET_ALL') {
        const now = Date.now();
        const prevAdmin = db.overrides?.admin;
        const nextOverrides = {};
        if (body.preserveAdminAuth && prevAdmin && prevAdmin.passwordHash) {
          nextOverrides.admin = {
            username: 'admin',
            academicId: prevAdmin.academicId || 'ADMIN-001',
            fullName: prevAdmin.fullName || 'المشرف العام على المنصة',
            role: 'admin',
            registrationSource: 'system_admin',
            passwordHash: prevAdmin.passwordHash,
            passwordSalt: prevAdmin.passwordSalt,
            isDeleted: false,
            deletedAt: 0,
            lastLoginAt: 0,
            loginCount: 0,
            createdAt: prevAdmin.createdAt || now,
            updatedAt: now,
          };
        }
        db.overrides = nextOverrides;
        db.deletedUsers = [];
        db.loginLogs = [];
        db.resetAt = Math.max(Number(body.resetAt || 0), now);
        saveServerDB(db);
      } else if (action === 'UPSERT_USER' && body.account) {
        const acc = body.account;
        const cleanU = String(acc.username || '').toLowerCase().trim();
        const cleanAcad = String(acc.academicId || '').toLowerCase().trim();
        if (cleanU) {
          const prev = db.overrides[cleanU] || {};
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
          saveServerDB(db);
        }
      } else if (action === 'DELETE_USER') {
        const cleanU = String(body.username || '').toLowerCase().trim();
        const cleanAcad = String(body.academicId || '').toLowerCase().trim();
        if (cleanU && cleanU !== 'admin') {
          const prev = db.overrides[cleanU] || {};
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
          saveServerDB(db);
        }
      } else if (action === 'ADD_LOGIN_LOG' && body.log) {
        const log = body.log;
        if (!(db.loginLogs || []).some((x) => x.id === log.id)) {
          db.loginLogs = [log, ...(db.loginLogs || [])].slice(0, 300);
        }
        const lu = String(log.username || '').toLowerCase().trim();
        const delSet = new Set(db.deletedUsers || []);
        if (
          lu &&
          log.status === 'success' &&
          log.authMethod !== 'registration' &&
          !delSet.has(lu)
        ) {
          const prev = db.overrides[lu] || { username: lu, role: log.role || 'user', createdAt: log.timestamp || Date.now() };
          if (!prev.isDeleted) {
            db.overrides[lu] = {
              ...prev,
              username: lu,
              academicId: prev.academicId || log.academicId || lu,
              fullName: prev.fullName || log.fullName || lu,
              lastLoginAt: Math.max(Number(prev.lastLoginAt || 0), Number(log.timestamp || Date.now())),
              loginCount: Number(prev.loginCount || 0) + 1,
              updatedAt: Date.now(),
            };
          }
        }
        saveServerDB(db);
      } else if (action === 'SYNC_MERGE' && body.localOverrides) {
        const clientSyncBaseline = Number(body.lastResetAt || 0);
        const serverResetAt = Number(db.resetAt || 0);
        const allowMergeFromClient = serverResetAt === 0 || clientSyncBaseline >= serverResetAt;

        if (allowMergeFromClient) {
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
          if (Array.isArray(body.localLoginLogs)) {
            const logMap = new Map();
            for (const l of db.loginLogs || []) {
              if (l && l.id) logMap.set(l.id, l);
            }
            for (const l of body.localLoginLogs) {
              if (l && l.id && Number(l.timestamp || 0) >= serverResetAt) {
                const lu = String(l.username || '').toLowerCase().trim();
                const la = String(l.academicId || '').toLowerCase().trim();
                if (!delSet.has(lu) && (!la || !delSet.has(la))) {
                  logMap.set(l.id, l);
                }
              }
            }
            db.loginLogs = Array.from(logMap.values())
              .sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0))
              .slice(0, 300);
          }
          db.deletedUsers = Array.from(delSet);
          saveServerDB(db);
        }
      }
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, ...db }) };
    } catch (err) {
      return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: String(err) }) };
    }
  }
  return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
};
