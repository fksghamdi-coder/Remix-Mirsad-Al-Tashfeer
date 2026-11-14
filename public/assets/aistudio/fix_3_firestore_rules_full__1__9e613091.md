# الملف الثالث المستقل الكامل: `firestore.rules`

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Global Safety Net (Default-Deny Catch-All)
    match /{document=**} {
      allow read, write: if false;
    }

    // =========================================================
    // Phase 3: Hardened Global Primitives
    // =========================================================
    function isSignedIn() {
      return request.auth != null;
    }

    function isVerifiedUser() {
      return isSignedIn() && request.auth.token.email_verified == true;
    }

    function incoming() {
      return request.resource.data;
    }

    function existing() {
      return resource.data;
    }

    function isValidId(id) {
      return id is string && id.size() >= 1 && id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\-]+$');
    }

    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    function isAdmin() {
      return isVerifiedUser() && (
        request.auth.token.email == 'fk.sghamdi@gmail.com' ||
        exists(/databases/$(database)/documents/admins/$(request.auth.uid))
      );
    }

    // =========================================================
    // Validation Blueprints (Anti-Update-Gap)
    // =========================================================
    function isValidAdminRecord(data) {
      return data.keys().hasAll(['uid', 'note', 'createdAt']) &&
        data.keys().hasOnly(['uid', 'note', 'createdAt']) &&
        data.uid is string && data.uid.size() >= 1 && data.uid.size() <= 128 && data.uid.matches('^[a-zA-Z0-9_\\-]+$') &&
        data.note is string && data.note.size() >= 1 && data.note.size() <= 200 &&
        data.createdAt is timestamp;
    }

    function isValidCertificate(data, certId) {
      return data.keys().hasAll(['certId', 'uid', 'studentName', 'courseCode', 'courseTitle', 'scorePercentage', 'issuedBy', 'issuedAt', 'status', 'integrityHash']) &&
        data.keys().hasOnly(['certId', 'uid', 'studentName', 'courseCode', 'courseTitle', 'scorePercentage', 'issuedBy', 'issuedAt', 'status', 'integrityHash']) &&
        data.certId == certId &&
        data.certId.matches('^MIR-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]$') &&
        data.uid is string && data.uid.size() >= 1 && data.uid.size() <= 128 &&
        data.studentName is string && data.studentName.size() >= 3 && data.studentName.size() <= 100 &&
        data.courseCode is string && data.courseCode.size() >= 1 && data.courseCode.size() <= 20 &&
        data.courseTitle is string && data.courseTitle.size() >= 1 && data.courseTitle.size() <= 150 &&
        (data.scorePercentage is int || data.scorePercentage is float) && data.scorePercentage >= 0 && data.scorePercentage <= 100 &&
        data.issuedBy == request.auth.uid &&
        data.issuedAt == request.time &&
        data.status == 'valid' &&
        data.integrityHash is string && data.integrityHash.matches('^[0-9a-f]{64}$');
    }

    function isValidUserProfile(data) {
      return data.keys().hasAll(['uid', 'username', 'displayName', 'role', 'needsPasswordChange', 'completedChapters', 'createdAt', 'updatedAt']) &&
        data.keys().hasOnly(['uid', 'username', 'displayName', 'role', 'needsPasswordChange', 'completedChapters', 'createdAt', 'updatedAt']) &&
        data.uid is string && data.uid.size() >= 1 && data.uid.size() <= 128 && data.uid.matches('^[a-zA-Z0-9_\\-]+$') &&
        data.username is string && data.username.size() >= 3 && data.username.size() <= 64 && data.username.matches('^[a-zA-Z0-9_\\-\\.]+$') &&
        data.displayName is string && data.displayName.size() >= 1 && data.displayName.size() <= 100 &&
        data.role is string && data.role in ['admin', 'user'] &&
        data.needsPasswordChange is bool &&
        data.completedChapters is list && data.completedChapters.size() <= 20 &&
        data.completedChapters.hasOnly([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]) &&
        data.createdAt is timestamp &&
        data.updatedAt is timestamp;
    }

    function isValidChapterDoc(data) {
      return data.keys().hasAll(['chapterNumber', 'title', 'description', 'category', 'visibility', 'authorId', 'createdAt', 'updatedAt']) &&
        data.keys().hasOnly(['chapterNumber', 'title', 'description', 'category', 'visibility', 'authorId', 'createdAt', 'updatedAt']) &&
        data.chapterNumber is int && data.chapterNumber >= 1 && data.chapterNumber <= 50 &&
        data.title is string && data.title.size() >= 3 && data.title.size() <= 200 &&
        data.description is string && data.description.size() >= 5 && data.description.size() <= 1000 &&
        data.category is string && data.category in ['أساسي', 'متقدم', 'شبكات', 'كمومي', 'تطبيقي'] &&
        data.visibility is string && data.visibility in ['public', 'archived'] &&
        data.authorId is string && data.authorId.size() >= 1 && data.authorId.size() <= 128 && data.authorId.matches('^[a-zA-Z0-9_\\-]+$') &&
        data.createdAt is timestamp &&
        data.updatedAt is timestamp;
    }

    function isValidQuizAttempt(data) {
      return data.keys().hasAll(['uid', 'chapterId', 'score', 'totalQuestions', 'status', 'createdAt', 'updatedAt']) &&
        data.keys().hasOnly(['uid', 'chapterId', 'score', 'totalQuestions', 'status', 'createdAt', 'updatedAt']) &&
        data.uid is string && data.uid.size() >= 1 && data.uid.size() <= 128 && data.uid.matches('^[a-zA-Z0-9_\\-]+$') &&
        data.uid == request.auth.uid &&
        data.chapterId is int && data.chapterId >= 1 && data.chapterId <= 50 &&
        data.score is int && data.score >= 0 && data.score <= 100 &&
        data.totalQuestions is int && data.totalQuestions >= 1 && data.totalQuestions <= 100 &&
        data.score <= data.totalQuestions &&
        data.status is string && data.status in ['in_progress', 'completed'] &&
        data.createdAt is timestamp &&
        data.updatedAt is timestamp;
    }

    function isValidAuditLog(data) {
      return data.keys().hasAll(['uid', 'actorName', 'action', 'category', 'details', 'createdAt']) &&
        data.keys().hasOnly(['uid', 'actorName', 'action', 'category', 'details', 'createdAt']) &&
        data.uid is string && data.uid.size() >= 1 && data.uid.size() <= 128 && data.uid.matches('^[a-zA-Z0-9_\\-]+$') &&
        data.uid == request.auth.uid &&
        data.actorName is string && data.actorName.size() >= 1 && data.actorName.size() <= 100 &&
        data.action is string && data.action.size() >= 2 && data.action.size() <= 120 &&
        data.category is string && data.category in ['auth', 'curriculum', 'security', 'lab'] &&
        data.details is string && data.details.size() >= 2 && data.details.size() <= 500 &&
        data.createdAt is timestamp;
    }

    // =========================================================
    // Collection Rules
    // =========================================================

    match /admins/{adminId} {
      allow get: if isSignedIn() && isValidId(adminId) && (request.auth.uid == adminId || isAdmin());
      allow list: if isAdmin() && resource.data.uid is string;
      allow create: if isAdmin() && isValidId(adminId) && isValidAdminRecord(incoming()) &&
        incoming().uid == adminId &&
        incoming().createdAt == request.time;
      allow update: if isAdmin() && isValidId(adminId) && isValidAdminRecord(incoming()) &&
        incoming().uid == existing().uid &&
        incoming().createdAt == existing().createdAt &&
        incoming().diff(existing()).affectedKeys().hasOnly(['note']);
      allow delete: if isAdmin() && isValidId(adminId);
    }

    match /users/{userId} {
      allow get: if isSignedIn() && isValidId(userId) && (isOwner(userId) || isAdmin());
      allow list: if isAdmin() && resource.data.role in ['admin', 'user'];
      allow create: if isVerifiedUser() && isValidId(userId) && isOwner(userId) &&
        isValidUserProfile(incoming()) &&
        incoming().uid == userId &&
        incoming().createdAt == request.time &&
        incoming().updatedAt == request.time &&
        (incoming().role == 'user' || isAdmin());
      allow update: if isVerifiedUser() && isValidId(userId) && isValidUserProfile(incoming()) &&
        incoming().uid == userId &&
        incoming().uid == existing().uid &&
        incoming().createdAt == existing().createdAt &&
        incoming().updatedAt == request.time && (
          isAdmin() ||
          (isOwner(userId) &&
            incoming().role == existing().role &&
            incoming().username == existing().username &&
            incoming().diff(existing()).affectedKeys().hasOnly(['displayName', 'needsPasswordChange', 'completedChapters', 'updatedAt'])
          )
        );
      allow delete: if isAdmin() && isValidId(userId);
    }

    // الشهادات: القراءة العامة بالمعرّف فقط (لا list للعموم)، والإصدار والإلغاء للمشرف فقط، ولا حذف
    match /certificates/{certId} {
      allow get: if isValidId(certId);
      allow list: if isSignedIn() && (resource.data.uid == request.auth.uid || isAdmin());
      allow create: if isAdmin() && isValidId(certId) && isValidCertificate(incoming(), certId);
      allow update: if isAdmin() && isValidId(certId) &&
        existing().status == 'valid' &&
        incoming().status == 'revoked' &&
        incoming().diff(existing()).affectedKeys().hasOnly(['status', 'revokedAt', 'revokeReason']) &&
        incoming().revokedAt == request.time &&
        incoming().revokeReason is string && incoming().revokeReason.size() >= 3 && incoming().revokeReason.size() <= 300;
      allow delete: if false;
    }

    match /chapters/{chapterId} {
      allow get: if isValidId(chapterId) && (resource.data.visibility == 'public' || isAdmin());
      allow list: if resource.data.visibility == 'public' || isAdmin();
      allow create: if isAdmin() && isValidId(chapterId) && isValidChapterDoc(incoming()) &&
        incoming().authorId == request.auth.uid &&
        incoming().createdAt == request.time &&
        incoming().updatedAt == request.time;
      allow update: if isAdmin() && isValidId(chapterId) && isValidChapterDoc(incoming()) &&
        incoming().authorId == existing().authorId &&
        incoming().createdAt == existing().createdAt &&
        incoming().updatedAt == request.time &&
        incoming().diff(existing()).affectedKeys().hasOnly(['chapterNumber', 'title', 'description', 'category', 'visibility', 'updatedAt']);
      allow delete: if isAdmin() && isValidId(chapterId);
    }

    match /quiz_attempts/{attemptId} {
      allow get: if isSignedIn() && isValidId(attemptId) && (resource.data.uid == request.auth.uid || isAdmin());
      allow list: if isSignedIn() && (resource.data.uid == request.auth.uid || isAdmin());
      allow create: if isVerifiedUser() && isValidId(attemptId) && isValidQuizAttempt(incoming()) &&
        incoming().createdAt == request.time &&
        incoming().updatedAt == request.time &&
        exists(/databases/$(database)/documents/users/$(request.auth.uid));
      allow update: if isVerifiedUser() && isValidId(attemptId) && isValidQuizAttempt(incoming()) &&
        incoming().uid == existing().uid &&
        incoming().chapterId == existing().chapterId &&
        incoming().createdAt == existing().createdAt &&
        incoming().updatedAt == request.time && (
          isAdmin() ||
          (existing().uid == request.auth.uid &&
            existing().status != 'completed' &&
            incoming().diff(existing()).affectedKeys().hasOnly(['score', 'status', 'updatedAt'])
          )
        );
      allow delete: if isAdmin() && isValidId(attemptId);
    }

    match /audit_logs/{logId} {
      allow get: if isSignedIn() && isValidId(logId) && (resource.data.uid == request.auth.uid || isAdmin());
      allow list: if isSignedIn() && (resource.data.uid == request.auth.uid || isAdmin());
      allow create: if isVerifiedUser() && isValidId(logId) && isValidAuditLog(incoming()) &&
        incoming().createdAt == request.time;
      allow update: if false;
      allow delete: if isAdmin() && isValidId(logId);
    }

    // سجل الحسابات المركزي وسجل تسجيل الدخول الفعلي للمزامنة الفورية مع لوحة الأدمن
    match /mirsad_admin_state/{docId} {
      allow read, write: if true;
    }

    match /mirsad_registered_users/{userId} {
      allow read, write: if true;
    }

    match /mirsad_login_logs/{logId} {
      allow read, write: if true;
    }
  }
}

```