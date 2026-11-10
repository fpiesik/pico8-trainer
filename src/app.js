import {
  missions,
  levelDurationSeconds,
  level2Exercises,
  matchesKey,
  matchesExercise,
  readProgress,
  keyboardRows,
} from './game.js';

const $ = selector => document.querySelector(selector);
const storageKey = 'pico-playground.progress.v1';
const levelStorageKey = 'pico-playground.levels.v1';
let saved;
let levelState = { level2Unlocked: false };
let storageAvailable = true;
try { saved = readProgress(localStorage.getItem(storageKey)); }
catch { saved = readProgress(null); storageAvailable = false; }
try {
  const stored = JSON.parse(localStorage.getItem(levelStorageKey));
  if (stored?.version === 1 && stored.level2Unlocked === true) levelState.level2Unlocked = true;
} catch {
  storageAvailable = false;
}

let mode = 'keyboard';
let level = 1;
let index = 0;
let phase = 'ready';
let hinted = false;
let runOrder = [];
let deadline = 0;
let timerId;
const held = new Set();
const keyElements = [];

for (const row of keyboardRows) {
  const element = document.createElement('div');
  element.className = 'keyboard-row';
  let arrows;
  for (const [label, key, width = 1] of row) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'keyboard-key';
    button.textContent = label;
    button.style.flex = String(width);
    button.dataset.key = key;
    button.disabled = true;
    button.setAttribute('aria-label', missions.find(m => m.key === key)?.name ?? label);
    button.addEventListener('click', () => {
      if (level === 1 && mode === 'screen' && phase === 'active') answerKey({ key });
    });
    keyElements.push(button);
    if (key.startsWith('Arrow')) {
      if (!arrows) {
        arrows = document.createElement('div');
        arrows.className = 'arrow-cluster';
        element.append(arrows);
      }
      arrows.append(button);
    } else {
      element.append(button);
    }
  }
  $('#keyboard').append(element);
}

function saveProgress() {
  try { localStorage.setItem(storageKey, JSON.stringify({ version: 1, ...saved })); }
  catch { storageAvailable = false; }
  updateSaveNote();
}

function saveLevelState() {
  try { localStorage.setItem(levelStorageKey, JSON.stringify({ version: 1, ...levelState })); }
  catch { storageAvailable = false; }
  updateSaveNote();
}

function updateSaveNote() {
  $('#save-note').textContent = storageAvailable
    ? 'Bestleistungen und Levelzugang werden automatisch auf diesem Gerät gespeichert.'
    : 'Speichern ist blockiert. Du kannst trotzdem spielen.';
}

function clearTimer() {
  if (timerId !== undefined) {
    clearInterval(timerId);
    timerId = undefined;
  }
}

function clearKeys() {
  held.clear();
  keyElements.forEach(key => key.classList.remove('pressed'));
}

function currentExercise() {
  return level2Exercises[index];
}

function updateTimer() {
  const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  $('#mission-count').textContent = `${seconds} Sek. · ${index} / ${missions.length} Tasten`;
  if (seconds === 0) finishLevel1();
}

function render() {
  const complete = phase === 'complete';
  const active = phase === 'active';
  const exercise = level === 2 ? currentExercise() : null;
  const targetCount = level === 1 ? missions.length : level2Exercises.length;
  const shownIndex = Math.min(index, targetCount);
  const best = saved[mode];

  $('.breadcrumb strong').textContent = `Level 0${level}`;
  $('.page-heading .eyebrow').textContent = level === 1 ? 'DEIN ERSTER SCHRITT' : 'ZEIT FÜR TASTENTRICKS';
  $('.page-heading h1').innerHTML = level === 1 ? 'Finde die Taste<span>.</span>' : 'Coole Tastentricks<span>.</span>';
  $('.page-heading p').textContent = level === 1
    ? 'Eine Tastatur. Viele Möglichkeiten. Lerne sie kennen!'
    : 'Mit Tastenkombinationen und Sonderzeichen geht’s schneller.';
  $('.level-badge').innerHTML = `<span aria-hidden="true">✦</span> LEVEL 0${level}`;
  $('.game-card').setAttribute('aria-label', level === 1 ? 'Tasten-Sprint' : 'Tastentricks-Übung');
  $('.mission-bar>span:first-child').innerHTML = `<span class="live-dot"></span> ${level === 1 ? 'TASTEN-SPRINT' : 'TASTENTRICKS'}`;
  $('.progress-track').setAttribute('aria-valuemax', String(targetCount));
  $('.progress-track').setAttribute('aria-valuenow', String(shownIndex));
  $('.progress-track').setAttribute('aria-label', level === 1 ? 'Gefundene verschiedene Tasten' : 'Gelöste Übungen');
  $('#progress-fill').style.width = `${shownIndex / targetCount * 100}%`;
  if (level === 1) {
    $('#mission-count').textContent = active
      ? `${Math.max(0, Math.ceil((deadline - Date.now()) / 1000))} Sek. · ${index} / ${missions.length} Tasten`
      : `${index} / ${missions.length} Tasten · Bestleistung: ${best}`;
  } else {
    $('#mission-count').textContent = `${index} / ${level2Exercises.length} Übungen`;
  }

  $('#game').classList.toggle('is-success', active && index > 0);
  $('#game').classList.toggle('is-complete', complete);
  $('#hint-button').hidden = !active;
  $('#action-button').hidden = active;
  $('#restart-button').hidden = phase === 'ready';
  $('#level-back-button').hidden = level !== 2;
  $('#screen-mode').disabled = level === 2 || active;
  $('#keyboard-caption').textContent = level === 2
    ? 'Level 2: Übe die Kombinationen auf deiner echten Tastatur.'
    : mode === 'screen'
      ? 'Bildschirmmodus: Tippe die gesuchte Taste hier unten an.'
      : 'Drücke die Tasten auf deiner echten Tastatur.';
  $('#keyboard-pressed-legend').hidden = level === 2;
  $('#practice-field').hidden = level !== 2;
  $('#practice-field').setAttribute('aria-label', 'Übungsfeld für Tastenkombinationen');
  keyElements.forEach(key => {
    key.disabled = level !== 1 || mode !== 'screen' || !active;
    const mission = level === 1 ? runOrder[index] : null;
    key.classList.toggle('hinted', hinted && key.dataset.key === mission?.key && active);
  });
  $('#level-1-nav').disabled = false;
  $('#level-2-nav').disabled = !levelState.level2Unlocked;
  $('#level-1-nav').closest('li').classList.toggle('current', level === 1);
  $('#level-2-nav').closest('li').classList.toggle('current', level === 2);
  $('#level-1-nav').setAttribute('aria-current', level === 1 ? 'step' : 'false');
  $('#level-2-nav').setAttribute('aria-current', level === 2 ? 'step' : 'false');
  $('#level-2-nav').closest('li').classList.toggle('locked', !levelState.level2Unlocked);
  $('#level-1-nav').querySelector('small').textContent = level === 1 ? 'Du bist hier' : `Bestleistung: ${best} / ${missions.length}`;
  $('#level-2-nav').querySelector('small').textContent = !levelState.level2Unlocked
    ? 'Nach Level 1 freigeschaltet'
    : level === 2 ? 'Du bist hier' : 'Kombinationen üben';

  if (level === 1) {
    $('#keyboard-title').textContent = 'Deine Tastatur im Überblick';
    if (complete) {
      $('#challenge-label').textContent = index === missions.length ? 'ALLE TASTEN GEFUNDEN!' : 'DIE ZEIT IST UM!';
      $('#prompt').textContent = index === missions.length ? 'Was für ein Tastensprint!' : `Du hast ${index} Tasten gefunden!`;
      $('#target-symbol').textContent = '★';
      $('#task-description').textContent = `Bestleistung in diesem Modus: ${Math.max(best, index)} von ${missions.length} verschiedenen Tasten. ${index === missions.length ? 'Level 2 ist jetzt freigeschaltet!' : 'Versuch es noch einmal und knacke deine Bestleistung.'}`;
      $('#action-button').innerHTML = 'Weiter zu Level 2 <span aria-hidden="true">→</span>';
      $('#mascot-message').textContent = 'Stark! Jetzt kommen die Tastentricks.';
    } else if (active) {
      const mission = runOrder[index];
      $('#challenge-label').textContent = `TASTE ${index + 1} VON ${missions.length} · NOCH ${Math.max(0, Math.ceil((deadline - Date.now()) / 1000))} SEK.`;
      $('#prompt').textContent = `Finde die ${mission.name}.`;
      $('#target-symbol').textContent = mission.symbol;
      $('#task-description').textContent = mode === 'screen' ? 'Tippe sie auf der Bildschirmtastatur an.' : 'Drücke sie auf deiner Tastatur. Danach geht es sofort weiter!';
      $('#mascot-message').textContent = 'Schau genau hin – und weiter zur nächsten Taste!';
      $('#action-button').innerHTML = 'Sprint starten <span aria-hidden="true">→</span>';
    } else {
      $('#challenge-label').textContent = 'BEREIT FÜR DEN TASTEN-SPRINT?';
      $('#prompt').textContent = 'Wie viele Tasten schaffst du?';
      $('#target-symbol').textContent = '60″';
      $('#task-description').textContent = `Finde in 1 Minute möglichst viele verschiedene Tasten. Deine Bestleistung: ${best} von ${missions.length}.`;
      $('#action-button').innerHTML = 'Sprint starten <span aria-hidden="true">→</span>';
      $('#mascot-message').textContent = 'Eine Minute, viele Tasten. Los geht’s!';
    }
  } else {
    const commandLabel = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Strg';
    if (complete) {
      $('#challenge-label').textContent = 'LEVEL 02 · GESCHAFFT!';
      $('#prompt').textContent = 'Du kennst die Tastentricks!';
      $('#target-symbol').textContent = '★';
      $('#task-description').textContent = `${level2Exercises.length} Übungen geschafft: Kopieren, Einfügen, Rückgängig, Sonderzeichen und mehr.`;
      $('#action-button').innerHTML = 'Level 2 noch einmal üben <span aria-hidden="true">↻</span>';
      $('#mascot-message').textContent = 'Richtig gut! Jetzt bist du noch schneller.';
    } else if (active) {
      $('#challenge-label').textContent = `AUFGABE ${index + 1} VON ${level2Exercises.length}`;
      $('#prompt').textContent = exercise.title;
      $('#target-symbol').textContent = exercise.type === 'shortcut'
        ? (/Mac|iPhone|iPad/.test(navigator.platform) && exercise.macSymbol
          ? exercise.macSymbol
          : exercise.symbol.replace('Strg', commandLabel))
        : exercise.symbol;
      $('#task-description').textContent = exercise.description;
      $('#action-button').innerHTML = 'Level 2 starten <span aria-hidden="true">→</span>';
      $('#mascot-message').textContent = 'Probier es direkt im Übungsfeld aus!';
    } else {
      $('#challenge-label').textContent = 'LEVEL 02 · TASTENKOMBINATIONEN';
      $('#prompt').textContent = 'Bereit für Tastentricks?';
      $('#target-symbol').textContent = 'Strg + ?';
      $('#task-description').textContent = 'Übe Kopieren, Einfügen, Rückgängig sowie Shift- und AltGr-Zeichen direkt im Textfeld.';
      $('#action-button').innerHTML = 'Level 2 starten <span aria-hidden="true">→</span>';
      $('#mascot-message').textContent = 'Zwei oder mehr Tasten können zusammenarbeiten!';
    }
  }
}

function begin() {
  clearTimer();
  hinted = false;
  index = 0;
  phase = 'active';
  $('#feedback').textContent = '';
  if (level === 1) {
    runOrder = [...missions];
    for (let i = runOrder.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [runOrder[i], runOrder[j]] = [runOrder[j], runOrder[i]];
    }
    deadline = Date.now() + levelDurationSeconds * 1000;
  }
  render();
  if (level === 1) {
    timerId = setInterval(updateTimer, 200);
    $('#game').focus({ preventScroll: true });
  } else {
    $('#practice-field').focus({ preventScroll: true });
  }
}

function unlockLevel2() {
  if (levelState.level2Unlocked) return;
  levelState.level2Unlocked = true;
  saveLevelState();
}

function finishLevel1() {
  if (level !== 1 || phase !== 'active') return;
  clearTimer();
  phase = 'complete';
  if (index > saved[mode]) {
    saved[mode] = index;
    saveProgress();
  }
  unlockLevel2();
  render();
  $('#feedback').textContent = index === missions.length
    ? 'Alle verschiedenen Tasten gefunden. Level 2 ist freigeschaltet!'
    : 'Zeit! Deine nächste Runde kann deine Bestleistung schlagen.';
  $('#action-button').focus({ preventScroll: true });
}

function answerKey(event) {
  if (phase !== 'active' || !runOrder[index]) return;
  if (matchesKey(event, runOrder[index])) {
    const found = runOrder[index];
    index += 1;
    if (index > saved[mode]) {
      saved[mode] = index;
      saveProgress();
    }
    hinted = false;
    if (index === missions.length) {
      finishLevel1();
      return;
    }
    render();
    $('#feedback').textContent = `${found.name} gefunden! Weiter geht’s.`;
  } else {
    $('#feedback').textContent = 'Noch nicht ganz. Schau weiter – die Zeit läuft!';
    $('#mascot-message').textContent = 'Kein Problem. Versuch’s noch einmal!';
  }
}

function answerExercise(event) {
  const exercise = currentExercise();
  if (phase !== 'active' || !exercise || !matchesExercise(event, exercise)) return;
  index += 1;
  hinted = false;
  if (index === level2Exercises.length) {
    phase = 'complete';
    render();
    $('#feedback').textContent = 'Level 2 geschafft! Du hast alle Tastentricks ausprobiert.';
    $('#action-button').focus({ preventScroll: true });
    return;
  }
  render();
  $('#feedback').textContent = `${exercise.symbol} geschafft! Weiter zur nächsten Übung.`;
}

function selectLevel(nextLevel) {
  if (nextLevel === 2 && !levelState.level2Unlocked) return;
  clearTimer();
  clearKeys();
  level = nextLevel;
  phase = 'ready';
  index = 0;
  hinted = false;
  $('#feedback').textContent = '';
  render();
  $('#game').focus({ preventScroll: true });
}

$('#action-button').addEventListener('click', () => {
  if (level === 1 && phase === 'complete') {
    selectLevel(2);
    begin();
    return;
  }
  begin();
});
$('#restart-button').addEventListener('click', begin);
$('#level-back-button').addEventListener('click', () => selectLevel(1));
$('#level-1-nav').addEventListener('click', () => selectLevel(1));
$('#level-2-nav').addEventListener('click', () => selectLevel(2));
$('#hint-button').addEventListener('click', () => {
  hinted = true;
  render();
  $('#feedback').textContent = level === 1 ? runOrder[index].hint : currentExercise().hint;
  if (level === 2) $('#practice-field').focus({ preventScroll: true });
  else $('#game').focus({ preventScroll: true });
});
$('#screen-mode').addEventListener('change', event => {
  mode = event.target.checked ? 'screen' : 'keyboard';
  phase = 'ready';
  index = 0;
  hinted = false;
  clearKeys();
  $('#feedback').textContent = '';
  render();
});

window.addEventListener('keydown', event => {
  if ($('#help-dialog').open || event.isComposing) return;
  const target = event.target;
  if (level === 2 && target === $('#practice-field')) {
    if (phase === 'active') answerExercise(event);
    return;
  }
  // Keep navigation, browser shortcuts and focused controls available.
  if (event.key === 'Tab' || event.altKey || event.metaKey || (event.ctrlKey && event.key !== 'Control')) return;
  if (target instanceof Element && target.closest('button, input, textarea, select, a, [contenteditable="true"]')) {
    if (held.has(event.key.toLowerCase()) && ['Enter', ' '].includes(event.key)) event.preventDefault();
    return;
  }
  if (level !== 1 || mode !== 'keyboard' || phase !== 'active') return;
  // Function keys remain available for browser help, reload and developer tools.
  if (/^F\d+$/.test(event.key)) return;
  const key = event.key.toLowerCase();
  if (keyElements.some(element => element.dataset.key.toLowerCase() === key)) event.preventDefault();
  if (held.has(key) || event.repeat) return;
  held.add(key);
  keyElements.forEach(element => element.classList.toggle('pressed', element.dataset.key.toLowerCase() === key));
  answerKey(event);
});
window.addEventListener('keyup', event => {
  if (held.has(event.key.toLowerCase()) && event.key === ' ' && phase === 'feedback') event.preventDefault();
  held.delete(event.key.toLowerCase());
  keyElements.forEach(element => { if (element.dataset.key.toLowerCase() === event.key.toLowerCase()) element.classList.remove('pressed'); });
});
window.addEventListener('blur', clearKeys);
document.addEventListener('visibilitychange', () => { if (document.hidden) clearKeys(); });
$('#help-open').addEventListener('click', () => { clearKeys(); $('#help-dialog').showModal(); });
$('#help-close').addEventListener('click', () => $('#help-dialog').close());
$('#help-dialog').addEventListener('close', () => {
  if (phase === 'active') {
    if (level === 1) $('#game').focus({ preventScroll: true });
    else $('#practice-field').focus({ preventScroll: true });
  }
});
updateSaveNote();
render();
