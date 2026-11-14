import { pgTable, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(), // Matches identifier / username (e.g. 'admin')
  username: text('username').notNull(),
  email: text('email'),
  name: text('name'),
  role: text('role').default('user').notNull(),
  department: text('department'),
  status: text('status').default('active').notNull(),
  mustChangePassword: boolean('must_change_password').default(false).notNull(),

  // High-Grade Cryptography & Audit Fields
  passwordHash: text('password_hash'),
  passwordSalt: text('password_salt'),
  encryptedPayload: text('encrypted_payload'), // AES-256-GCM cipher payload
  hmacSignature: text('hmac_signature'),       // HMAC-SHA256 signature over payload
  lastLoginAt: timestamp('last_login_at'),
  loginCount: integer('login_count').default(0).notNull(),
  failedAttempts: integer('failed_attempts').default(0).notNull(),
  lockedUntil: timestamp('locked_until'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const certificates = pgTable('certificates', {
  id: text('id').primaryKey(),
  domain: text('domain').notNull(),
  issuer: text('issuer').notNull(),
  algorithm: text('algorithm').notNull(),
  keySize: integer('key_size').notNull(),
  expiryDate: text('expiry_date').notNull(),
  pqcStatus: text('pqc_status').default('classic').notNull(),
  securityScore: integer('security_score').default(80).notNull(),
  createdBy: text('created_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const auditLogs = pgTable('audit_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  userEmail: text('user_email').notNull(),
  action: text('action').notNull(),
  details: text('details').notNull(),
  severity: text('severity').default('info').notNull(),

  // Immutable SHA-256 Hash Chain
  prevHash: text('prev_hash'),
  hash: text('hash'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const loginSessions = pgTable('login_sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  username: text('username').notNull(),
  sessionToken: text('session_token').notNull(),
  encryptedPayload: text('encrypted_payload'), // AES-256-GCM encrypted session state
  hmacSignature: text('hmac_signature'),       // HMAC-SHA256 signature
  userAgent: text('user_agent'),
  ipAddress: text('ip_address'),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
