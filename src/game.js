export const missions = [
  { key: ' ', name: 'Leertaste', symbol: '⎵', hint: 'Die lange Taste ganz unten, in der Mitte.', fact: 'Die Leertaste setzt einen Abstand zwischen zwei Wörtern. In vielen Spielen lässt sie deine Figur springen.' },
  { key: 'Enter', name: 'Enter-Taste', symbol: '↵', hint: 'Rechts neben den Buchstaben. Oft steht Enter oder Return darauf, manchmal nur ↵.', fact: 'Mit Enter bestätigst du eine Eingabe. Beim Schreiben beginnst du damit eine neue Zeile.' },
  { key: 'ArrowLeft', name: 'Pfeiltaste nach links', symbol: '←', hint: 'Suche die kleine Gruppe mit vier Pfeilen, meist rechts unten. Dieser Pfeil zeigt nach links.', fact: 'Pfeiltasten bewegen die Schreibmarke. In PICO-8 kannst du damit auch deine Spielfigur steuern.' },
  { key: 'ArrowRight', name: 'Pfeiltaste nach rechts', symbol: '→', hint: 'Sie sitzt bei den anderen Pfeiltasten und zeigt nach rechts.', fact: 'Mit diesem Pfeil bewegst du die Schreibmarke oder eine Spielfigur nach rechts.' },
  { key: 'ArrowUp', name: 'Pfeiltaste nach oben', symbol: '↑', hint: 'Suche den oberen Pfeil in der Gruppe der vier Pfeiltasten.', fact: 'Dieser Pfeil führt nach oben. Später bestimmst du mit deinem Code selbst, was eine Taste im Spiel macht!' },
  { key: 'ArrowDown', name: 'Pfeiltaste nach unten', symbol: '↓', hint: 'Unter dem Pfeil nach oben liegt meistens der Pfeil nach unten.', fact: 'Mit diesem Pfeil geht es eine Zeile nach unten. In einem Menü wählst du damit oft den nächsten Eintrag.' },
  { key: 'Escape', name: 'Escape-Taste', symbol: 'Esc', hint: 'Ganz oben links. Auf der Taste steht meistens Esc.', fact: 'Escape bedeutet „entkommen“. Damit schließt du oft ein Menü oder brichst einen Vorgang ab.' },
  { key: 'Shift', name: 'Umschalttaste', symbol: '⇧', hint: 'Suche links oder rechts einen breiten Pfeil nach oben: ⇧. Manchmal steht Shift darauf.', fact: 'Halte Umschalt gedrückt und tippe einen Buchstaben: Er wird groß. Auf Englisch heißt diese Taste Shift.' },
  { key: 'Control', name: 'Steuerungstaste', symbol: 'Strg', hint: 'Meistens unten links. Sie heißt Strg, Ctrl oder Control. Auf dem Mac suchst du control (⌃).', fact: 'Strg ist eine Team-Taste: Strg + Z macht in vielen Programmen etwas rückgängig. Auf dem Mac nutzt du dafür meistens Command (⌘).' },
  { key: 'Backspace', name: 'Rücktaste', symbol: '⌫', hint: 'Oben rechts über Enter. Suche einen Pfeil nach links: ← oder ⌫. Auf Macs heißt sie oft delete.', fact: 'Die Rücktaste löscht das Zeichen links von der Schreibmarke. Perfekt, um einen Tippfehler zu verbessern.' },
  { key: 'a', name: 'Taste A', symbol: 'A', hint: 'Suche links in der mittleren Buchstabenreihe.', fact: 'Aus Buchstaben werden Wörter, Geschichten und Programme. Mit A beginnt dein nächstes Abenteuer!' },
  { key: 'z', name: 'Taste Z', symbol: 'Z', hint: 'Auf einer deutschen Tastatur liegt Z zwischen T und U. Auf anderen Tastaturen findest du es manchmal unten links.', fact: 'Geschafft! Z begegnet dir später wieder: zum Beispiel bei Strg + Z zum Rückgängigmachen.' },
];

export function matchesKey(event, mission) {
  if (event.repeat || event.isComposing || event.altKey || event.metaKey) return false;
  if (event.ctrlKey && mission.key !== 'Control') return false;
  if (event.shiftKey && mission.key !== 'Shift' && mission.key.length !== 1) return false;
  return event.key.toLowerCase() === mission.key.toLowerCase();
}

export function readProgress(raw) {
  try {
    const value = JSON.parse(raw);
    if (value?.version !== 1) return { keyboard: 0, screen: 0 };
    const valid = n => Number.isInteger(n) && n >= 0 && n <= missions.length ? n : 0;
    return { keyboard: valid(value.keyboard), screen: valid(value.screen) };
  } catch {
    return { keyboard: 0, screen: 0 };
  }
}

export const keyboardRows = [
  [['Esc', 'Escape'], ...Array.from({ length: 12 }, (_, i) => [`F${i + 1}`, `F${i + 1}`])],
  [['^', '^'], ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9'], ['0', '0'], ['ß', 'ß'], ['⌫', 'Backspace', 2]],
  [['Tab', 'Tab', 1.5], ...'QWERTZUIOPÜ'.split('').map(k => [k, k.toLowerCase()]), ['+', '+', 1.5]],
  [['⇩', 'CapsLock', 1.7], ...'ASDFGHJKLÖÄ'.split('').map(k => [k, k.toLowerCase()]), ['Enter ↵', 'Enter', 2]],
  [['⇧', 'Shift', 2], ['<', '<'], ...'YXCVBNM'.split('').map(k => [k, k.toLowerCase()]), [',', ','], ['.', '.'], ['−', '-'], ['⇧', 'Shift', 1.7]],
  [['Strg', 'Control', 1.5], ['⌘ / ⊞', 'Meta', 1.5], ['Alt', 'Alt'], ['Leertaste', ' ', 6], ['Alt Gr', 'AltGraph'], ['←', 'ArrowLeft'], ['↑', 'ArrowUp'], ['↓', 'ArrowDown'], ['→', 'ArrowRight']],
];
