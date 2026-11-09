import test from 'node:test';
import assert from 'node:assert/strict';
import { missions, matchesKey, readProgress, keyboardRows } from '../src/game.js';

test('jede Mission hat eine erreichbare Taste und eine Erklärung', () => {
  assert.equal(missions.length, 12);
  assert.equal(new Set(missions.map(m => m.key)).size, missions.length);
  const keys = keyboardRows.flat().map(([, key]) => key);
  for (const mission of missions) {
    assert.ok(keys.includes(mission.key), mission.name);
    assert.ok(mission.hint && mission.fact);
    assert.equal(matchesKey({ key: mission.key }, mission), true);
  }
});

test('Buchstaben sind unabhängig von Großschreibung und physischem Layout', () => {
  const z = missions.find(m => m.key === 'z');
  assert.ok(matchesKey({ key: 'Z', code: 'KeyY', shiftKey: true }, z));
  assert.equal(matchesKey({ key: 'y', code: 'KeyZ' }, z), false);
});

test('falsche Tasten, gehaltene Tasten, IME und Browserkürzel zählen nicht', () => {
  const space = missions[0];
  assert.equal(matchesKey({ key: 'Enter' }, space), false);
  assert.equal(matchesKey({ key: ' ', repeat: true }, space), false);
  assert.equal(matchesKey({ key: ' ', isComposing: true }, space), false);
  for (const modifier of ['ctrlKey', 'altKey', 'metaKey']) {
    assert.equal(matchesKey({ key: 'z', [modifier]: true }, missions.at(-1)), false);
  }
  assert.ok(matchesKey({ key: 'Control', ctrlKey: true }, missions.find(m => m.key === 'Control')));
  assert.ok(matchesKey({ key: 'Shift', shiftKey: true }, missions.find(m => m.key === 'Shift')));
});

test('Fortschritt wird getrennt für echte und Bildschirmtastatur gelesen', () => {
  assert.deepEqual(readProgress('{"version":1,"keyboard":4,"screen":12}'), { keyboard: 4, screen: 12 });
});

test('beschädigte, fremde und ungültige Speicherstände werden abgefangen', () => {
  for (const input of [null, '', 'kaputt', 'null', '[]', '{"version":2,"keyboard":5}']) {
    assert.deepEqual(readProgress(input), { keyboard: 0, screen: 0 });
  }
  for (const keyboard of [-1, 13, 1.5, '3', null, {}]) {
    assert.deepEqual(readProgress(JSON.stringify({ version: 1, keyboard, screen: 2 })), { keyboard: 0, screen: 2 });
  }
});
