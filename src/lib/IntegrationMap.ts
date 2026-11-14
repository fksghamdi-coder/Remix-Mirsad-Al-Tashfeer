// src/lib/IntegrationMap.ts
/**
 * نظام التكامل المرئي لنوايا المنصة (Interactive Data Map)
 * يوضح كيف تتدفق البيانات والأفعال بين الأجزاء.
 */
export const IntegrationMap = {
  // دوران المستخدم → API Backend
  UserAction_ToBackend: (action: string) => {
    return `Fetch /api/v1/${action}`;
  },
  
  // Backend → Frontend عبر HMR
  Backend_ToFrontend: "WebSocket or HTTP 200 with updated data",
  
  // AI Tutor → Backend → Frontend
  TutorInteraction: (question: string) => {
    return `Send POST /api/v1/ai-tutor ${JSON.stringify({ question })}`;
  }
};
