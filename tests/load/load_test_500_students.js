import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m', target: 500 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'],   // error rate must be < 1%
  },
};

export default function () {
  const BASE_URL = __ENV.TARGET_URL || 'http://localhost:3000';

  const resHealth = http.get(`${BASE_URL}/api/v1/health`);
  check(resHealth, { 'health check status 200': (r) => r.status === 200 });

  const resVerify = http.get(`${BASE_URL}/api/v1/certificates/verify/SAMPLE_SEAL_TEST`);
  check(resVerify, { 'verify certificate responds': (r) => r.status === 200 || r.status === 404 });

  sleep(1);
}
