/**
 * Firestore Security Rules Verification Specification (Dirty Dozen Test Suite)
 * Verifies that all 12 adversarial payloads defined in security_spec.md are denied.
 */

export interface DirtyDozenTestCase {
  id: number;
  name: string;
  collection: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  expectedResult: 'PERMISSION_DENIED';
  guardTriggered: string;
}

export const DIRTY_DOZEN_TESTS: DirtyDozenTestCase[] = [
  {
    id: 1,
    name: 'Shadow Field Injection on UserProfile Create',
    collection: 'users',
    operation: 'create',
    expectedResult: 'PERMISSION_DENIED',
    guardTriggered: 'data.keys().hasOnly([...])',
  },
  {
    id: 2,
    name: 'Self-Assigned Admin Role on UserProfile Create',
    collection: 'users',
    operation: 'create',
    expectedResult: 'PERMISSION_DENIED',
    guardTriggered: 'incoming().role == "user" || isAdmin()',
  },
  {
    id: 3,
    name: 'Identity Spoofing on QuizAttempt Create',
    collection: 'quiz_attempts',
    operation: 'create',
    expectedResult: 'PERMISSION_DENIED',
    guardTriggered: 'data.uid == request.auth.uid',
  },
  {
    id: 4,
    name: 'Terminal State Bypass on QuizAttempt Update',
    collection: 'quiz_attempts',
    operation: 'update',
    expectedResult: 'PERMISSION_DENIED',
    guardTriggered: 'existing().status != "completed"',
  },
  {
    id: 5,
    name: 'Unverified Email Admin Spoof on Chapter Create',
    collection: 'chapters',
    operation: 'create',
    expectedResult: 'PERMISSION_DENIED',
    guardTriggered: 'request.auth.token.email_verified == true',
  },
  {
    id: 6,
    name: 'Cross-User Profile Read Attempt',
    collection: 'users',
    operation: 'get',
    expectedResult: 'PERMISSION_DENIED',
    guardTriggered: 'isOwner(userId) || isAdmin()',
  },
  {
    id: 7,
    name: 'Unfiltered List Query on QuizAttempts',
    collection: 'quiz_attempts',
    operation: 'list',
    expectedResult: 'PERMISSION_DENIED',
    guardTriggered: 'resource.data.uid == request.auth.uid',
  },
  {
    id: 8,
    name: 'Client Timestamp Forgery on AuditLog',
    collection: 'audit_logs',
    operation: 'create',
    expectedResult: 'PERMISSION_DENIED',
    guardTriggered: 'incoming().createdAt == request.time',
  },
  {
    id: 9,
    name: 'Oversized String Resource Poisoning on AuditLog',
    collection: 'audit_logs',
    operation: 'create',
    expectedResult: 'PERMISSION_DENIED',
    guardTriggered: 'data.details.size() <= 500',
  },
  {
    id: 10,
    name: 'Unbounded Array Injection on UserProfile',
    collection: 'users',
    operation: 'update',
    expectedResult: 'PERMISSION_DENIED',
    guardTriggered: 'data.completedChapters.size() <= 20',
  },
  {
    id: 11,
    name: 'Immortal Field Mutation on ChapterDoc Update',
    collection: 'chapters',
    operation: 'update',
    expectedResult: 'PERMISSION_DENIED',
    guardTriggered: 'incoming().createdAt == existing().createdAt && incoming().authorId == existing().authorId',
  },
  {
    id: 12,
    name: 'AuditLog Tampering Update Attempt',
    collection: 'audit_logs',
    operation: 'update',
    expectedResult: 'PERMISSION_DENIED',
    guardTriggered: 'allow update: if false',
  },
];
