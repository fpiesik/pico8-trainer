import { missions, matchesKey, readProgress, keyboardRows } from './game.js';

const $ = selector => document.querySelector(selector);
const storageKey = 'pico-playground.progress.v1';
let saved;
let storageAvailable = true;
try { saved = readProgress(localStorage.getItem(storageKey)); }
catch { saved = readProgress(null); storageAvailable = false; }
let mode = 'keyboard';
let index = saved[mode];
let phase = 'ready';
let hinted = false;
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
      if (mode === 'screen' && phase === 'active') answer({ key });
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

function save() {
  saved[mode] = index;
  try { localStorage.setItem(storageKey, JSON.stringify({ version: 1, ...saved })); }
  catch { storageAvailable = false; }
  updateSaveNote();
}

function updateSaveNote() {
  $('#save-note').textContent = storageAvailable
    ? 'Automatisch gespeichert, auf diesem Gerät.'
    : 'Speichern ist blockiert. Du kannst trotzdem spielen.';
}

function clearKeys() {
  held.clear();
  keyElements.forEach(key => key.classList.remove('pressed'));
}

function render() {
  const complete = index === missions.length;
  const active = phase === 'active';
  const feedback = phase === 'feedback';
  const mission = missions[Math.min(index, missions.length - 1)];
  $('#progress-fill').style.width = `${index / missions.length * 100}%`;
  $('.progress-track').setAttribute('aria-valuenow', String(index));
  $('#mission-count').textContent = `${index} / ${missions.length} Tasten entdeckt`;
  $('#game').classList.toggle('is-success', feedback || complete);
  $('#game').classList.toggle('is-complete', complete);
  $('#hint-button').hidden = !active;
  $('#action-button').hidden = active;
  $('#restart-button').hidden = phase === 'ready' && index === 0;
  $('#screen-mode').disabled = feedback;
  $('#keyboard-caption').textContent = mode === 'screen'
    ? 'Bildschirmmodus: Tippe die gesuchte Taste hier unten an.'
    : 'Drücke die Tasten auf deiner echten Tastatur.';
  keyElements.forEach(key => {
    key.disabled = mode !== 'screen' || !active;
    key.classList.toggle('hinted', hinted && key.dataset.key === mission.key && active);
  });
  if (complete) {
    $('#challenge-label').textContent = 'LEVEL 01 · GESCHAFFT!';
    $('#prompt').textContent = 'Du bist ein Tastenprofi!';
    $('#target-symbol').textContent = '★';
    $('#task-description').textContent = mode === 'screen'
      ? '12 Tasten auf dem Bildschirm entdeckt. Probiere sie als Nächstes auf einer echten Tastatur aus!'
      : `12 Tasten entdeckt! ${missions.at(-1).fact}`;
    $('#action-button').innerHTML = 'Noch einmal spielen <span aria-hidden="true">↻</span>';
    $('#mascot-message').textContent = 'High five! Das hast du toll gemacht.';
  } else if (active) {
    $('#challenge-label').textContent = `AUFGABE ${index + 1} VON ${missions.length}`;
    $('#prompt').textContent = `Finde die ${mission.name}.`;
    $('#target-symbol').textContent = mission.symbol;
    $('#task-description').textContent = mode === 'screen' ? 'Tippe sie auf der Bildschirmtastatur an.' : 'Drücke sie auf deiner Tastatur.';
    $('#mascot-message').textContent = index === 0 ? 'Schau in Ruhe. Du findest sie!' : 'Eine neue Taste, eine neue Superkraft.';
  } else if (feedback) {
    const previous = missions[index - 1];
    $('#challenge-label').textContent = 'RICHTIG GEFUNDEN!';
    $('#prompt').textContent = `Das ist die ${previous.name}.`;
    $('#target-symbol').textContent = previous.symbol;
    $('#task-description').textContent = previous.fact;
    $('#action-button').innerHTML = `Nächste Taste <span aria-hidden="true">→</span>`;
    $('#mascot-message').textContent = 'Gut gemacht! Wieder etwas gelernt.';
  } else {
    $('#challenge-label').textContent = index ? 'SCHÖN, DASS DU WIEDER DA BIST!' : 'BEREIT, DEINE TASTATUR ZU ENTDECKEN?';
    $('#prompt').textContent = index ? 'Dein Abenteuer geht weiter.' : 'Dein Abenteuer beginnt hier.';
    $('#target-symbol').textContent = '⎵';
    $('#task-description').textContent = index ? `${index} Tasten kennst du schon. Weiter geht’s mit Taste ${index + 1}!` : 'Finde 12 Tasten auf deiner Tastatur. Du hast alle Zeit der Welt.';
    $('#action-button').innerHTML = `${index ? 'Mission fortsetzen' : 'Mission starten'} <span aria-hidden="true">→</span>`;
    $('#mascot-message').textContent = 'Hey! Ich bin Pixel. Wir schaffen das zusammen!';
  }
}

function begin() {
  phase = 'active';
  hinted = false;
  $('#feedback').textContent = '';
  render();
  $('#game').focus({ preventScroll: true });
}

function answer(event) {
  if (phase !== 'active' || event.repeat || event.isComposing) return;
  if (matchesKey(event, missions[index])) {
    const found = missions[index];
    index += 1;
    phase = index === missions.length ? 'complete' : 'feedback';
    hinted = false;
    save();
    render();
    $('#feedback').textContent = index === missions.length ? 'Alle 12 Tasten gefunden. Level geschafft!' : `Treffer! ${found.name} gefunden.`;
    $('#action-button').focus({ preventScroll: true });
  } else {
    $('#feedback').textContent = 'Noch nicht ganz. Schau in Ruhe weiter – du schaffst das!';
    $('#mascot-message').textContent = 'Kein Problem. Versuch’s noch einmal!';
  }
}

$('#action-button').addEventListener('click', () => {
  if (index === missions.length) { index = 0; save(); }
  begin();
});
$('#restart-button').addEventListener('click', () => { index = 0; save(); clearKeys(); begin(); });
$('#hint-button').addEventListener('click', () => {
  hinted = true;
  render();
  $('#feedback').textContent = missions[index].hint;
  $('#game').focus({ preventScroll: true });
});
$('#screen-mode').addEventListener('change', event => {
  mode = event.target.checked ? 'screen' : 'keyboard';
  index = saved[mode];
  phase = 'ready';
  hinted = false;
  clearKeys();
  $('#feedback').textContent = '';
  render();
});

window.addEventListener('keydown', event => {
  if ($('#help-dialog').open || event.isComposing) return;
  // Keep navigation, browser shortcuts and focused controls available.
  if (event.key === 'Tab' || event.altKey || event.metaKey || (event.ctrlKey && event.key !== 'Control')) return;
  const target = event.target;
  if (target instanceof Element && target.closest('button, input, textarea, select, a, [contenteditable="true"]')) {
    // A held answer key must not accidentally activate the newly focused next button.
    if (held.has(event.key.toLowerCase()) && ['Enter', ' '].includes(event.key)) event.preventDefault();
    return;
  }
  const key = event.key.toLowerCase();
  if (mode !== 'keyboard' || phase !== 'active') return;
  // Function keys remain available for browser help, reload and developer tools.
  if (/^F\d+$/.test(event.key)) return;
  if (keyElements.some(element => element.dataset.key.toLowerCase() === key)) event.preventDefault();
  if (held.has(key) || event.repeat) return;
  held.add(key);
  keyElements.forEach(element => element.classList.toggle('pressed', element.dataset.key.toLowerCase() === key));
  answer(event);
});
window.addEventListener('keyup', event => {
  // Space activates buttons on keyup; suppress the release of the just-solved answer.
  if (held.has(event.key.toLowerCase()) && event.key === ' ' && phase === 'feedback') event.preventDefault();
  held.delete(event.key.toLowerCase());
  keyElements.forEach(element => { if (element.dataset.key.toLowerCase() === event.key.toLowerCase()) element.classList.remove('pressed'); });
});
window.addEventListener('blur', clearKeys);
document.addEventListener('visibilitychange', () => { if (document.hidden) clearKeys(); });
$('#help-open').addEventListener('click', () => { clearKeys(); $('#help-dialog').showModal(); });
$('#help-close').addEventListener('click', () => $('#help-dialog').close());
$('#help-dialog').addEventListener('close', () => { if (phase === 'active') $('#game').focus({ preventScroll: true }); });
updateSaveNote();
render();
