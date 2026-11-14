import { db } from './index.ts';
import { users } from './schema.ts';
import { eq, ne } from 'drizzle-orm';

export async function getOrCreateUser(
  uid: string,
  email: string,
  extra?: {
    username?: string;
    name?: string;
    role?: string;
    department?: string;
    status?: string;
    mustChangePassword?: boolean;
    passwordHash?: string;
    passwordSalt?: string;
    encryptedPayload?: string;
    hmacSignature?: string;
    lastLoginAt?: Date;
    loginCount?: number;
    failedAttempts?: number;
    lockedUntil?: Date;
  }
) {
  try {
    const cleanUsername = (extra?.username || uid).toLowerCase();
    const [user] = await db
      .insert(users)
      .values({
        id: uid,
        username: cleanUsername,
        email,
        name: extra?.name,
        role: extra?.role ?? 'user',
        department: extra?.department,
        status: extra?.status ?? 'active',
        mustChangePassword: extra?.mustChangePassword ?? false,
        passwordHash: extra?.passwordHash,
        passwordSalt: extra?.passwordSalt,
        encryptedPayload: extra?.encryptedPayload,
        hmacSignature: extra?.hmacSignature,
        lastLoginAt: extra?.lastLoginAt,
        loginCount: extra?.loginCount ?? 0,
        failedAttempts: extra?.failedAttempts ?? 0,
        lockedUntil: extra?.lockedUntil,
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          username: cleanUsername,
          email,
          ...(extra?.name !== undefined ? { name: extra.name } : {}),
          ...(extra?.role !== undefined ? { role: extra.role } : {}),
          ...(extra?.department !== undefined ? { department: extra.department } : {}),
          ...(extra?.status !== undefined ? { status: extra.status } : {}),
          ...(extra?.mustChangePassword !== undefined ? { mustChangePassword: extra.mustChangePassword } : {}),
          ...(extra?.passwordHash !== undefined ? { passwordHash: extra.passwordHash } : {}),
          ...(extra?.passwordSalt !== undefined ? { passwordSalt: extra.passwordSalt } : {}),
          ...(extra?.encryptedPayload !== undefined ? { encryptedPayload: extra.encryptedPayload } : {}),
          ...(extra?.hmacSignature !== undefined ? { hmacSignature: extra.hmacSignature } : {}),
          ...(extra?.lastLoginAt !== undefined ? { lastLoginAt: extra.lastLoginAt } : {}),
          ...(extra?.loginCount !== undefined ? { loginCount: extra.loginCount } : {}),
          ...(extra?.failedAttempts !== undefined ? { failedAttempts: extra.failedAttempts } : {}),
          ...(extra?.lockedUntil !== undefined ? { lockedUntil: extra.lockedUntil } : {}),
          updatedAt: new Date(),
        },
      })
      .returning();

    return user;
  } catch (error) {
    console.error('Database query error in getOrCreateUser:', error);
    throw new Error('Failed to synchronize user record.');
  }
}

export async function getAllUsers() {
  try {
    return await db.select().from(users);
  } catch (error) {
    console.error('Database query error in getAllUsers:', error);
    throw new Error('Failed to fetch users from database.');
  }
}

export async function deleteUserById(uid: string) {
  try {
    const [deleted] = await db.delete(users).where(eq(users.id, uid)).returning();
    return deleted;
  } catch (error) {
    console.error('Database query error in deleteUserById:', error);
    throw new Error('Failed to delete user record.');
  }
}

/**
 * دالة مسح وحذف جميع المستخدمين ما عدا حساب الأدمن فقط من قاعدة بيانات SQL المركزية
 * وحصر قاعدة البيانات على حساب المشرف العام
 */
export async function purgeAllNonAdminUsersSQL(): Promise<{ deletedCount: number }> {
  try {
    const deletedRows = await db
      .delete(users)
      .where(ne(users.username, 'admin'))
      .returning();

    return { deletedCount: deletedRows.length };
  } catch (error) {
    console.error('Database error in purgeAllNonAdminUsersSQL:', error);
    return { deletedCount: 0 };
  }
}
