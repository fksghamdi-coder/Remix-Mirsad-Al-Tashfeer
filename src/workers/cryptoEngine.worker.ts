/**
 * Web Worker for Offloading Heavy Cryptographic Computation
 * Operations: MOD_EXP_BATCH, PAILLIER_HOMOMORPHIC_EVAL, GF28_MATRIX_MIX
 */

export interface CryptoWorkerMessage {
  id: string;
  type: 'MOD_EXP_BATCH' | 'PAILLIER_HOMOMORPHIC_EVAL' | 'GF28_MATRIX_MIX';
  payload: any;
}

export interface CryptoWorkerResponse {
  id: string;
  success: boolean;
  result?: any;
  error?: string;
  timeMs: number;
}

self.onmessage = (event: MessageEvent<CryptoWorkerMessage>) => {
  const { id, type, payload } = event.data;
  const start = performance.now();

  try {
    let result: any;

    if (type === 'MOD_EXP_BATCH') {
      // Modular Exponentiation Batch: (base^exp) % mod
      const { items } = payload as { items: Array<{ base: number; exp: number; mod: number }> };
      result = items.map(({ base, exp, mod }) => {
        let res = 1n;
        let b = BigInt(base) % BigInt(mod);
        let e = BigInt(exp);
        const m = BigInt(mod);
        while (e > 0n) {
          if (e % 2n === 1n) res = (res * b) % m;
          e = e / 2n;
          b = (b * b) % m;
        }
        return Number(res);
      });
    } else if (type === 'PAILLIER_HOMOMORPHIC_EVAL') {
      // Homomorphic Addition: E(m1) * E(m2) mod n^2
      const { cipher1, cipher2, nSquare } = payload as { cipher1: string; cipher2: string; nSquare: string };
      const c1 = BigInt(cipher1);
      const c2 = BigInt(cipher2);
      const n2 = BigInt(nSquare);
      const evalResult = (c1 * c2) % n2;
      result = evalResult.toString();
    } else if (type === 'GF28_MATRIX_MIX') {
      // Galois Field GF(2^8) MixColumns multiplication
      const { matrix } = payload as { matrix: number[][] };
      result = matrix.map((row) =>
        row.map((val) => {
          let p = 0;
          let a = val;
          let b = 0x02; // Standard MixColumns multiplication factor
          for (let counter = 0; counter < 8; counter++) {
            if ((b & 1) !== 0) p ^= a;
            const hi_bit_set = (a & 0x80) !== 0;
            a = (a << 1) & 0xff;
            if (hi_bit_set) a ^= 0x1b; // AES Irreducible polynomial x^8 + x^4 + x^3 + x + 1
            b >>= 1;
          }
          return p;
        })
      );
    } else {
      throw new Error(`Unsupported crypto worker operation: ${type}`);
    }

    const duration = performance.now() - start;
    const response: CryptoWorkerResponse = {
      id,
      success: true,
      result,
      timeMs: duration,
    };
    self.postMessage(response);
  } catch (err: any) {
    const duration = performance.now() - start;
    const response: CryptoWorkerResponse = {
      id,
      success: false,
      error: err?.message || 'Worker computation error',
      timeMs: duration,
    };
    self.postMessage(response);
  }
};
