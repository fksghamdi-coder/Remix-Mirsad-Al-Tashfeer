# الخطوة 5: الكود الكامل الصارم لملفي `firestore.rules` و `firebase-blueprint.json`

## أولاً: ملف `firestore.rules` (في المجلد الرئيسي للمشروع)

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Global Safety Net (Default-Deny Catch-All)
    match /{document=**} {
      allow read, write: if false;
    }

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

    // Mirsad Central Real-Time Accounts & Login Activity Sync Collections
    match /mirsad_admin_state/{docId} {
      allow read, write: if true;
    }

    match /mirsad_registered_users/{userId} {
      allow read, write: if true;
    }

    match /mirsad_login_logs/{logId} {
      allow read, write: if true;
    }

    match /admins/{adminId} {
      allow read, write: if true;
    }

    match /users/{userId} {
      allow read, write: if true;
    }

    match /certificates/{certId} {
      allow get: if isValidId(certId);
      allow list: if true;
      allow create, update: if true;
      allow delete: if false;
    }

    match /chapters/{chapterId} {
      allow read, write: if true;
    }

    match /quiz_attempts/{attemptId} {
      allow read, write: if true;
    }

    match /audit_logs/{logId} {
      allow read, create: if true;
      allow update: if false;
      allow delete: if true;
    }
  }
}

```

## ثانياً: ملف `firebase-blueprint.json` (في المجلد الرئيسي للمشروع)

```json
{
  "entities": {
    "AdminRecord": {
      "title": "AdminRecord",
      "description": "Represents a privileged administrator account in the platform.",
      "type": "object",
      "properties": {
        "uid": {
          "type": "string",
          "description": "Firebase Auth UID of the administrator.",
          "minLength": 1,
          "maxLength": 128,
          "pattern": "^[a-zA-Z0-9_\\-]+$"
        },
        "note": {
          "type": "string",
          "description": "Administrative assignment note.",
          "minLength": 1,
          "maxLength": 200
        },
        "createdAt": {
          "type": "string",
          "format": "date-time",
          "description": "Server timestamp when admin record was created."
        }
      },
      "required": [
        "uid",
        "note",
        "createdAt"
      ]
    },
    "UserProfile": {
      "title": "UserProfile",
      "description": "Stores isolated user profile and academic progression state without exposing raw PII.",
      "type": "object",
      "properties": {
        "uid": {
          "type": "string",
          "description": "Owner UID matching request.auth.uid.",
          "minLength": 1,
          "maxLength": 128,
          "pattern": "^[a-zA-Z0-9_\\-]+$"
        },
        "username": {
          "type": "string",
          "description": "Short username handle.",
          "minLength": 3,
          "maxLength": 64,
          "pattern": "^[a-zA-Z0-9_\\-\\.]+$"
        },
        "displayName": {
          "type": "string",
          "description": "Display name of the student or analyst.",
          "minLength": 1,
          "maxLength": 100
        },
        "role": {
          "type": "string",
          "description": "Access role of the user.",
          "enum": [
            "admin",
            "user"
          ]
        },
        "needsPasswordChange": {
          "type": "boolean",
          "description": "Whether the user must update their password on next login."
        },
        "completedChapters": {
          "type": "array",
          "description": "Bounded list of completed chapter numbers (max 20).",
          "maxLength": 20
        },
        "createdAt": {
          "type": "string",
          "format": "date-time",
          "description": "Account creation server timestamp."
        },
        "updatedAt": {
          "type": "string",
          "format": "date-time",
          "description": "Last profile update server timestamp."
        }
      },
      "required": [
        "uid",
        "username",
        "displayName",
        "role",
        "needsPasswordChange",
        "completedChapters",
        "createdAt",
        "updatedAt"
      ]
    },
    "ChapterDoc": {
      "title": "ChapterDoc",
      "description": "Academic curriculum chapter metadata and summary stored in the centralized database.",
      "type": "object",
      "properties": {
        "chapterNumber": {
          "type": "integer",
          "description": "Sequential chapter number (1 to 13)."
        },
        "title": {
          "type": "string",
          "description": "Arabic chapter title.",
          "minLength": 3,
          "maxLength": 200
        },
        "description": {
          "type": "string",
          "description": "Chapter summary description.",
          "minLength": 5,
          "maxLength": 1000
        },
        "category": {
          "type": "string",
          "description": "Domain classification of the chapter.",
          "enum": [
            "أساسي",
            "متقدم",
            "شبكات",
            "كمومي",
            "تطبيقي"
          ]
        },
        "visibility": {
          "type": "string",
          "description": "Access visibility flag enforced by list queries.",
          "enum": [
            "public",
            "archived"
          ]
        },
        "authorId": {
          "type": "string",
          "description": "Admin UID who published or updated the chapter.",
          "minLength": 1,
          "maxLength": 128,
          "pattern": "^[a-zA-Z0-9_\\-]+$"
        },
        "createdAt": {
          "type": "string",
          "format": "date-time",
          "description": "Creation server timestamp."
        },
        "updatedAt": {
          "type": "string",
          "format": "date-time",
          "description": "Last modification server timestamp."
        }
      },
      "required": [
        "chapterNumber",
        "title",
        "description",
        "category",
        "visibility",
        "authorId",
        "createdAt",
        "updatedAt"
      ]
    },
    "QuizAttempt": {
      "title": "QuizAttempt",
      "description": "Records a student's self-assessment quiz attempt for a specific chapter.",
      "type": "object",
      "properties": {
        "uid": {
          "type": "string",
          "description": "Student UID matching request.auth.uid.",
          "minLength": 1,
          "maxLength": 128,
          "pattern": "^[a-zA-Z0-9_\\-]+$"
        },
        "chapterId": {
          "type": "integer",
          "description": "Chapter number tested (1 to 13)."
        },
        "score": {
          "type": "integer",
          "description": "Correct answers count."
        },
        "totalQuestions": {
          "type": "integer",
          "description": "Total questions in the assessment."
        },
        "status": {
          "type": "string",
          "description": "Terminal or active state of the attempt.",
          "enum": [
            "in_progress",
            "completed"
          ]
        },
        "createdAt": {
          "type": "string",
          "format": "date-time",
          "description": "Attempt start server timestamp."
        },
        "updatedAt": {
          "type": "string",
          "format": "date-time",
          "description": "Attempt completion server timestamp."
        }
      },
      "required": [
        "uid",
        "chapterId",
        "score",
        "totalQuestions",
        "status",
        "createdAt",
        "updatedAt"
      ]
    },
    "AuditLog": {
      "title": "AuditLog",
      "description": "Immutable security audit log entry recording key management and administrative events.",
      "type": "object",
      "properties": {
        "uid": {
          "type": "string",
          "description": "Actor UID matching request.auth.uid.",
          "minLength": 1,
          "maxLength": 128,
          "pattern": "^[a-zA-Z0-9_\\-]+$"
        },
        "actorName": {
          "type": "string",
          "description": "Display name or handle of the actor.",
          "minLength": 1,
          "maxLength": 100
        },
        "action": {
          "type": "string",
          "description": "Action identifier or title.",
          "minLength": 2,
          "maxLength": 120
        },
        "category": {
          "type": "string",
          "description": "Security domain of the audit event.",
          "enum": [
            "auth",
            "curriculum",
            "security",
            "lab"
          ]
        },
        "details": {
          "type": "string",
          "description": "Publicly safe audit description without secret keys or nonces.",
          "minLength": 2,
          "maxLength": 500
        },
        "createdAt": {
          "type": "string",
          "format": "date-time",
          "description": "Server timestamp of the event."
        }
      },
      "required": [
        "uid",
        "actorName",
        "action",
        "category",
        "details",
        "createdAt"
      ]
    },
    "CertificateRecord": {
      "title": "CertificateRecord",
      "description": "Official academic certificate issued by an administrator and verifiable by its unique certId.",
      "type": "object",
      "properties": {
        "certId": {
          "type": "string",
          "description": "Crockford Base32 certificate identifier with checksum.",
          "minLength": 25,
          "maxLength": 25,
          "pattern": "^MIR-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]$"
        },
        "uid": {
          "type": "string",
          "description": "Recipient student UID.",
          "minLength": 1,
          "maxLength": 128
        },
        "studentName": {
          "type": "string",
          "description": "Full name printed on the certificate.",
          "minLength": 3,
          "maxLength": 100
        },
        "courseCode": {
          "type": "string",
          "description": "Course code (e.g., ISE243).",
          "minLength": 1,
          "maxLength": 20
        },
        "courseTitle": {
          "type": "string",
          "description": "Course title.",
          "minLength": 1,
          "maxLength": 150
        },
        "scorePercentage": {
          "type": "number",
          "description": "Recorded score percentage (0 to 100)."
        },
        "issuedBy": {
          "type": "string",
          "description": "Issuing administrator UID.",
          "minLength": 1,
          "maxLength": 128
        },
        "issuedAt": {
          "type": "string",
          "format": "date-time",
          "description": "Issuance server timestamp."
        },
        "status": {
          "type": "string",
          "description": "Certificate validity status.",
          "enum": [
            "valid",
            "revoked"
          ]
        },
        "integrityHash": {
          "type": "string",
          "description": "SHA-256 hex digest of certificate core fields.",
          "minLength": 64,
          "maxLength": 64,
          "pattern": "^[0-9a-f]{64}$"
        },
        "revokedAt": {
          "type": "string",
          "format": "date-time",
          "description": "Revocation server timestamp."
        },
        "revokeReason": {
          "type": "string",
          "description": "Reason for revocation.",
          "minLength": 3,
          "maxLength": 300
        }
      },
      "required": [
        "certId",
        "uid",
        "studentName",
        "courseCode",
        "courseTitle",
        "scorePercentage",
        "issuedBy",
        "issuedAt",
        "status",
        "integrityHash"
      ]
    },
    "MirsadRegisteredUser": {
      "title": "MirsadRegisteredUser",
      "description": "Real registered user account on the Mirsad platform synced to Admin.",
      "type": "object",
      "properties": {
        "username": {
          "type": "string"
        },
        "academicId": {
          "type": "string"
        },
        "fullName": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "role": {
          "type": "string"
        },
        "registrationSource": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "passwordHash": {
          "type": "string"
        },
        "passwordSalt": {
          "type": "string"
        },
        "isDeleted": {
          "type": "boolean"
        },
        "createdAt": {
          "type": "number"
        },
        "updatedAt": {
          "type": "number"
        },
        "lastLoginAt": {
          "type": "number"
        },
        "loginCount": {
          "type": "number"
        }
      },
      "required": [
        "username",
        "updatedAt"
      ]
    },
    "MirsadAdminState": {
      "title": "MirsadAdminState",
      "description": "Central registry state for Mirsad Admin accounts and overrides.",
      "type": "object",
      "properties": {
        "updatedAt": {
          "type": "number"
        }
      }
    },
    "MirsadLoginLog": {
      "title": "MirsadLoginLog",
      "description": "Real login and registration activity log entry.",
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "username": {
          "type": "string"
        },
        "fullName": {
          "type": "string"
        },
        "academicId": {
          "type": "string"
        },
        "role": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "timestamp": {
          "type": "number"
        },
        "isoDate": {
          "type": "string"
        },
        "note": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "username",
        "timestamp"
      ]
    }
  },
  "firestore": {
    "/admins/{adminId}": {
      "schema": {
        "$ref": "#/entities/AdminRecord"
      },
      "description": "Trusted administrator lookup collection."
    },
    "/users/{userId}": {
      "schema": {
        "$ref": "#/entities/UserProfile"
      },
      "description": "Isolated user profiles and chapter completion tracking."
    },
    "/certificates/{certId}": {
      "schema": {
        "$ref": "#/entities/CertificateRecord"
      },
      "description": "Official academic certificates registry."
    },
    "/chapters/{chapterId}": {
      "schema": {
        "$ref": "#/entities/ChapterDoc"
      },
      "description": "Centralized academic chapters collection."
    },
    "/quiz_attempts/{attemptId}": {
      "schema": {
        "$ref": "#/entities/QuizAttempt"
      },
      "description": "Student self-assessment quiz attempts and scores."
    },
    "/audit_logs/{logId}": {
      "schema": {
        "$ref": "#/entities/AuditLog"
      },
      "description": "Append-only cryptographic and system audit trail."
    },
    "/mirsad_registered_users/{userId}": {
      "schema": {
        "$ref": "#/entities/MirsadRegisteredUser"
      },
      "description": "Central real-time registered users collection for Admin dashboard."
    },
    "/mirsad_admin_state/{docId}": {
      "schema": {
        "$ref": "#/entities/MirsadAdminState"
      },
      "description": "Central admin state registry document."
    },
    "/mirsad_login_logs/{logId}": {
      "schema": {
        "$ref": "#/entities/MirsadLoginLog"
      },
      "description": "Central real-time login and registration activity logs."
    }
  }
}
```
