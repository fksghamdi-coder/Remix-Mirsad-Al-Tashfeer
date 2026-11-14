// File: netlify/functions/accounts.mjs
import fs from 'node:fs';

const DB_FILE = '/tmp/mirsad_central_server_db_v1.json';

function loadServerDB() {
  if (!globalThis.__MIRSAD_SERVER_DB__) {
    globalThis.__MIRSAD_SERVER_DB__ = {
      overrides: {},
      deletedUsers: [],
      loginLogs: [],
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
    'Access-Control-Allow-Headers': 'Content-Type',
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

      if (action === 'UPSERT_USER' && body.account) {
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
        if (lu && log.status === 'success' && !delSet.has(lu) && db.overrides[lu] && !db.overrides[lu].isDeleted) {
          db.overrides[lu].lastLoginAt = log.timestamp || Date.now();
          db.overrides[lu].loginCount = Number(db.overrides[lu].loginCount || 0) + 1;
          db.overrides[lu].updatedAt = Date.now();
        }
        saveServerDB(db);
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
        saveServerDB(db);
      }
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, ...db }) };
    } catch (err) {
      return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: String(err) }) };
    }
  }
  return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
};
