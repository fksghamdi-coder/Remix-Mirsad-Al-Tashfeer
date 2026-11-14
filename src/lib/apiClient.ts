// src/lib/apiClient.ts
import { SyncEngine } from './syncEngine';

export const apiClient = {
  async request(endpoint: string, method = 'GET', body?: unknown) {
    const storedToken =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('mirsad_token') ||
          localStorage.getItem('mirsad_session_token')
        : null;

    if (!storedToken && typeof window !== 'undefined') {
      void SyncEngine;
    }

    const token = storedToken ?? 'MIRSAD_SECURE_DEFAULT_SESSION_TOKEN';

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const requestInit: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    let response: Response;
    try {
      response = await fetch(`http://localhost:8000/api/v1${endpoint}`, requestInit);
    } catch {
      // التوجيه التلقائي لخادم المنصة المدمج (/api/v1) في بيئة السحابة عند عدم تشغيل منفذ 8000 محلياً
      response = await fetch(`/api/v1${endpoint}`, requestInit);
    }

    if (!response.ok) {
      if (response.status === 403) throw new Error('Security Breach: Token Invalid');
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  },
};
