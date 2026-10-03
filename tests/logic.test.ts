import test from 'node:test';
import assert from 'node:assert/strict';
import { validateParticipant, displayableRate } from '../services/measurement/validation.ts';
import { MockRespiratoryAnalyzer } from '../services/measurement/MockRespiratoryAnalyzer.ts';
import { toRow, fromRow } from '../services/database/conversion.ts';
test('optional inputs remain optional and text is trimmed', () => {
  assert.deepEqual(validateParticipant(' ', '', ' '), { participantId: '', age: null, notes: '' });
  assert.equal(validateParticipant(' A01 ', '25', '').participantId, 'A01');
});
test('invalid and out-of-range ages are rejected', () => {
  for (const value of ['0', '-1', '121', '2.5', 'abc', 'Infinity', '1e2']) assert.throws(() => validateParticipant('', value, ''));
  assert.equal(validateParticipant('', '120', '').age, 120);
});
test('overlong metadata is rejected', () => {
  assert.throws(() => validateParticipant('x'.repeat(81), '', ''));
  assert.throws(() => validateParticipant('', '', 'x'.repeat(2001)));
});
test('mock analyzer returns explicitly versioned sample data', async () => {
  const r = await new MockRespiratoryAnalyzer().analyze({ durationSeconds: 30 });
  assert.equal(r.respiratoryRate, 16); assert.equal(r.algorithmVersion, 'mock-0.1');
  assert.equal(r.confidenceScore, 0.91); assert.equal(r.signalQuality, 'good');
});
test('short recordings are unusable and their rates are hidden', async () => {
  const r = await new MockRespiratoryAnalyzer().analyze({ durationSeconds: 10 });
  assert.equal(r.signalQuality, 'unusable'); assert.equal(displayableRate({ ...r, respiratoryRate: 16 }), null);
});
test('invalid analysis durations and rates are rejected or hidden', async () => {
  const analyzer = new MockRespiratoryAnalyzer();
  for (const durationSeconds of [0, -1, NaN, Infinity]) await assert.rejects(analyzer.analyze({ durationSeconds }));
  const r = await analyzer.analyze({ durationSeconds: 30 });
  assert.equal(displayableRate({ ...r, respiratoryRate: NaN }), null);
});
test('database conversion preserves optional fields and errors', async () => {
  for (const durationSeconds of [10, 30]) {
    const m = { ...validateParticipant('A01', '', 'note'), ...await new MockRespiratoryAnalyzer().analyze({ durationSeconds }), id: 'test', timestamp: '2026-10-03T12:00:00.000Z' };
    assert.deepEqual(fromRow(toRow(m)), m);
  }
});
