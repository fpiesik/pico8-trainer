import test from 'node:test';
import assert from 'node:assert/strict';
import {
  missions,
  levelDurationSeconds,
  level2Exercises,
  matchesKey,
  matchesExercise,
  readProgress,
  keyboardRows,
} from '../src/game.js';

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

test('Level 1 ist ein einminütiger Sprint und Level 2 übt Tastenkürzel und Doppelbelegungen', () => {
  assert.equal(levelDurationSeconds, 60);
  assert.ok(level2Exercises.some(exercise => exercise.type === 'shortcut' && exercise.key === 'a'));
  for (const key of ['c', 'v', 'x', 'z', 'y']) {
    assert.ok(level2Exercises.some(exercise => exercise.type === 'shortcut' && exercise.key === key));
  }
  for (const key of ['_', '=', '?', '(', ')', '*', '[', ']', '{', '}', '@', '€', '\\']) {
    assert.ok(level2Exercises.some(exercise => exercise.key === key));
  }
});

test('Tastenkürzel und Zeichenkombinationen reagieren nur auf die richtige Belegung', () => {
  const selectAll = level2Exercises.find(exercise => exercise.key === 'a');
  const underscore = level2Exercises.find(exercise => exercise.key === '_');
  const leftBracket = level2Exercises.find(exercise => exercise.key === '[');
  const redo = level2Exercises.find(exercise => exercise.key === 'y');

  assert.equal(matchesExercise({ key: 'a', ctrlKey: true }, selectAll), true);
  assert.equal(matchesExercise({ key: 'a', metaKey: true }, selectAll), true);
  assert.equal(matchesExercise({ key: 'a', ctrlKey: true, shiftKey: true }, selectAll), false);
  assert.equal(matchesExercise({ key: 'a' }, selectAll), false);
  assert.equal(matchesExercise({ key: 'y', ctrlKey: true }, redo), true);
  assert.equal(matchesExercise({ key: 'z', metaKey: true, shiftKey: true }, redo), true);
  assert.equal(matchesExercise({ key: '_', shiftKey: true }, underscore), true);
  assert.equal(matchesExercise({ key: '-', shiftKey: true }, underscore), false);
  assert.equal(matchesExercise({ key: '[', ctrlKey: true, altKey: true }, leftBracket), true);
  assert.equal(matchesExercise({
    key: '[',
    getModifierState: name => name === 'AltGraph',
  }, leftBracket), true);
  assert.equal(matchesExercise({ key: '[', altKey: true }, leftBracket), true);
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
