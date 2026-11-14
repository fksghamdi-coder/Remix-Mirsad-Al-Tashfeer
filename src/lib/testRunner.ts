// src/lib/testRunner.ts
export interface TestResult {
  name: string;
  category: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
}

export interface Test {
  name: string;
  category: string;
  fn: () => Promise<void> | void;
}

export interface TestSuite {
  name: string;
  tests: Test[];
}

class TestRunner {
  private suites: Map<string, Test[]> = new Map();
  private results: TestResult[] = [];
  private currentCategory = '';

  describe(name: string, fn: () => void) {
    const prev = this.currentCategory;
    this.currentCategory = name;
    if (!this.suites.has(name)) this.suites.set(name, []);
    fn();
    this.currentCategory = prev;
  }

  it(name: string, fn: () => Promise<void> | void) {
    if (!this.currentCategory) throw new Error('it() must be inside describe()');
    const tests = this.suites.get(this.currentCategory) || [];
    tests.push({ name, category: this.currentCategory, fn });
    this.suites.set(this.currentCategory, tests);
  }

  async run(
    onProgress?: (result: TestResult, index: number, total: number) => void
  ): Promise<TestResult[]> {
    this.results = [];
    const allTests: Test[] = [];
    for (const tests of this.suites.values()) allTests.push(...tests);

    for (let i = 0; i < allTests.length; i++) {
      const test = allTests[i];
      const start = performance.now();
      let result: TestResult;

      try {
        await Promise.race([
          test.fn(),
          new Promise((_, rej) =>
            setTimeout(() => rej(new Error('Timeout 10s')), 10000)
          ),
        ]);
        result = {
          name: test.name,
          category: test.category,
          status: 'passed',
          duration: performance.now() - start,
        };
      } catch (err: any) {
        result = {
          name: test.name,
          category: test.category,
          status: 'failed',
          duration: performance.now() - start,
          error: err?.message || String(err),
        };
      }

      this.results.push(result);
      onProgress?.(result, i + 1, allTests.length);
    }

    return this.results;
  }

  reset() {
    this.suites.clear();
    this.results = [];
    this.currentCategory = '';
  }

  getResults() { return this.results; }
  getSuites() { return this.suites; }
}

export const testRunner = new TestRunner();

/* ============ Assertions ============ */
export function expect(actual: any) {
  const eq = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

  const assertions = {
    toBe(expected: any) {
      if (actual !== expected)
        throw new Error(`متوقع ${JSON.stringify(expected)} · فعلي ${JSON.stringify(actual)}`);
    },
    toEqual(expected: any) {
      if (!eq(actual, expected))
        throw new Error(`متوقع ${JSON.stringify(expected)} · فعلي ${JSON.stringify(actual)}`);
    },
    toBeTruthy() {
      if (!actual) throw new Error(`متوقع قيمة · فعلي ${JSON.stringify(actual)}`);
    },
    toBeFalsy() {
      if (actual) throw new Error(`متوقع قيمة فارغة · فعلي ${JSON.stringify(actual)}`);
    },
    toContain(item: any) {
      if (!Array.isArray(actual) && typeof actual !== 'string')
        throw new Error(`المتوقع مصفوفة أو نص`);
      if (!actual.includes(item))
        throw new Error(`لا يحتوي ${JSON.stringify(item)}`);
    },
    toHaveLength(n: number) {
      if (actual?.length !== n)
        throw new Error(`الطول ${n} · فعلي ${actual?.length}`);
    },
    toBeGreaterThan(n: number) {
      if (!(actual > n)) throw new Error(`متوقع > ${n} · فعلي ${actual}`);
    },
    toBeLessThan(n: number) {
      if (!(actual < n)) throw new Error(`متوقع < ${n} · فعلي ${actual}`);
    },
    toBeInstanceOf(ctor: any) {
      if (!(actual instanceof ctor))
        throw new Error(`متوقع نسخة من ${ctor.name}`);
    },
  };

  const notAssertions = {
    toBe(expected: any) {
      if (actual === expected)
        throw new Error(`متوقع عدم المساواة لـ ${JSON.stringify(expected)}`);
    },
    toEqual(expected: any) {
      if (eq(actual, expected))
        throw new Error(`متوقع عدم التطابق لـ ${JSON.stringify(expected)}`);
    },
  };

  return {
    ...assertions,
    not: notAssertions,
  };
}
