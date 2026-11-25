// Own tests for the one-line-one-laugh writer.
// Run with: node --test test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { LAUGH_LINE, findProblems, publishLaugh } from './main.ts';

const LINE =
  'My smart fridge just emailed me: it is leaving me for the toaster, and it is taking the leftovers in the divorce.';

test('the laugh line text is exactly the intended line', () => {
  assert.equal(LAUGH_LINE, LINE);
});

test('the laugh line passes every gate rule', () => {
  assert.deepEqual(findProblems(LAUGH_LINE), []);
});

test('the laugh line is one line of 1 to 200 characters', () => {
  assert.ok(LAUGH_LINE.length >= 1 && LAUGH_LINE.length <= 200);
  assert.equal(LAUGH_LINE.length, 113);
  assert.ok(!/[\r\n]/.test(LAUGH_LINE));
  assert.ok(LAUGH_LINE.trim().length > 0);
});

test('the laugh line is a self-contained joke: appliance, breakup, punchline', () => {
  assert.ok(/smart fridge/i.test(LAUGH_LINE), 'appliance setup');
  assert.ok(/leaving me for the toaster/i.test(LAUGH_LINE), 'breakup twist');
  assert.ok(/leftovers in the divorce/i.test(LAUGH_LINE), 'punchline');
});

test('publishLaugh writes entry.txt byte-identical on repeat runs', () => {
  const first = mkdtempSync(join(tmpdir(), 'laugh-a-'));
  const second = mkdtempSync(join(tmpdir(), 'laugh-b-'));
  publishLaugh(first);
  publishLaugh(second);
  const a = readFileSync(join(first, 'entry.txt'));
  const b = readFileSync(join(second, 'entry.txt'));
  assert.ok(a.equals(b));
  assert.equal(a.toString('utf8'), LINE);
  assert.ok(!a.toString('utf8').endsWith('\n'));
});

test('running main.ts as a program writes the same entry', () => {
  const dir = mkdtempSync(join(tmpdir(), 'laugh-cli-'));
  execFileSync(process.execPath, ['main.ts'], {
    cwd: new URL('.', import.meta.url).pathname,
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: dir },
  });
  assert.equal(readFileSync(join(dir, 'entry.txt'), 'utf8'), LINE);
});

// Negative tests: the validator must reject lines that break the gate.
test('over-limit line is rejected', () => {
  const long = 'x'.repeat(201);
  assert.ok(findProblems(long).some((p) => p.includes('length')));
});

test('whitespace-only line is rejected', () => {
  assert.ok(findProblems('   ').some((p) => p.includes('white space')));
});

test('multi-line text is rejected', () => {
  assert.ok(
    findProblems('first line\nsecond line').some((p) => p.includes('line break')),
  );
});

test('leading and trailing spaces are rejected', () => {
  assert.ok(
    findProblems(' padded line ').some((p) => p.includes('leading or trailing')),
  );
});

test('control characters are rejected', () => {
  assert.ok(
    findProblems('line with\ttab').some((p) => p.includes('control character')),
  );
});

test('a line with no letters is rejected', () => {
  assert.ok(findProblems('1234567890!').some((p) => p.includes('no letter')));
});

test('a line containing a link is rejected', () => {
  assert.ok(
    findProblems('see http://example.com for the joke').some((p) =>
      p.includes('link'),
    ),
  );
});

test('a too-short line is rejected', () => {
  assert.ok(findProblems('Ha!').some((p) => p.includes('words')));
});
