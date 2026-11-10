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

export const levelDurationSeconds = 60;

export const level2Exercises = [
  { type: 'shortcut', key: 'a', symbol: 'Strg + A', title: 'Markiere den ganzen Text.', description: 'Klicke ins Übungsfeld und probiere die Tastenkombination aus.', hint: 'Halte Strg gedrückt und tippe A. Auf dem Mac nimmst du ⌘ statt Strg.', fact: 'Alles auswählen markiert den gesamten Text im Feld.', modifier: 'command' },
  { type: 'shortcut', key: 'c', symbol: 'Strg + C', title: 'Kopiere den markierten Text.', description: 'Der Text ist noch markiert. Kopiere ihn ins Clipboard.', hint: 'Halte Strg gedrückt und tippe C. Auf dem Mac nimmst du ⌘ statt Strg.', fact: 'Kopieren legt eine Auswahl in die Zwischenablage, ohne sie zu entfernen.', modifier: 'command' },
  { type: 'shortcut', key: 'v', symbol: 'Strg + V', title: 'Füge den Text wieder ein.', description: 'Setze den kopierten Text im Übungsfeld ein.', hint: 'Halte Strg gedrückt und tippe V. Auf dem Mac nimmst du ⌘ statt Strg.', fact: 'Einfügen setzt den Inhalt der Zwischenablage an der Schreibmarke ein.', modifier: 'command' },
  { type: 'shortcut', key: 'x', symbol: 'Strg + X', title: 'Schneide den Text aus.', description: 'Markiere einen Teil des Textes und schneide ihn aus.', hint: 'Halte Strg gedrückt und tippe X. Auf dem Mac nimmst du ⌘ statt Strg.', fact: 'Ausschneiden legt den markierten Text in die Zwischenablage und entfernt ihn aus dem Feld.', modifier: 'command' },
  { type: 'shortcut', key: 'z', symbol: 'Strg + Z', title: 'Mache den letzten Schritt rückgängig.', description: 'Mache eine Änderung im Übungsfeld rückgängig.', hint: 'Halte Strg gedrückt und tippe Z. Auf dem Mac nimmst du ⌘ statt Strg.', fact: 'Rückgängig macht die letzte Änderung rückwärts.', modifier: 'command' },
  { type: 'shortcut', key: 'y', symbol: 'Strg + Y', macSymbol: '⌘ + Umschalt + Z', alternateKey: 'z', title: 'Stelle den Schritt wieder her.', description: 'Stelle die Änderung wieder her, die du rückgängig gemacht hast.', hint: 'Halte Strg gedrückt und tippe Y. Auf dem Mac: ⌘ + Umschalt + Z.', fact: 'Wiederholen stellt einen rückgängig gemachten Schritt wieder her.', modifier: 'command' },
  { type: 'shift', key: '_', symbol: '_', title: 'Finde den Unterstrich.', description: 'Drücke die Tastenkombination für das Zeichen im Übungsfeld.', hint: 'Auf einer deutschen Tastatur ist es meistens Umschalt + -.', fact: 'Der Unterstrich verbindet Wörter in Dateinamen und taucht oft im Programmcode auf.' },
  { type: 'shift', key: '=', symbol: '=', title: 'Finde das Gleichheitszeichen.', description: 'Drücke die Tastenkombination für das Zeichen im Übungsfeld.', hint: 'Auf einer deutschen Tastatur ist es meistens Umschalt + 0.', fact: 'Mit = vergleichst oder verbindest du Werte – in Programmen ist es besonders wichtig.' },
  { type: 'shift', key: '?', symbol: '?', title: 'Finde das Fragezeichen.', description: 'Drücke die Tastenkombination für das Zeichen im Übungsfeld.', hint: 'Auf einer deutschen Tastatur ist es meistens Umschalt + ß.', fact: 'Fragezeichen helfen dir, Fragen zu stellen – auch an deinen Code.' },
  { type: 'shift', key: '(', symbol: '(', title: 'Finde die öffnende Klammer.', description: 'Drücke die Tastenkombination für das Zeichen im Übungsfeld.', hint: 'Auf einer deutschen Tastatur ist es Umschalt + 8.', fact: 'Klammern halten zusammengehörige Teile in Text und Code zusammen.' },
  { type: 'shift', key: ')', symbol: ')', title: 'Finde die schließende Klammer.', description: 'Drücke die Tastenkombination für das Zeichen im Übungsfeld.', hint: 'Auf einer deutschen Tastatur ist es Umschalt + 9.', fact: 'Eine schließende Klammer macht ein Klammerpaar vollständig.' },
  { type: 'shift', key: '*', symbol: '*', title: 'Finde den Stern.', description: 'Drücke die Tastenkombination für das Zeichen im Übungsfeld.', hint: 'Auf einer deutschen Tastatur ist es meistens Umschalt + +.', fact: 'Der Stern steht in vielen Programmiersprachen für eine Multiplikation.' },
  { type: 'shift', key: '!', symbol: '!', title: 'Finde das Ausrufezeichen.', description: 'Drücke die Tastenkombination für das Zeichen im Übungsfeld.', hint: 'Auf einer deutschen Tastatur ist es Umschalt + 1.', fact: 'Das Ausrufezeichen bringt Energie in Texte und kennzeichnet in manchen Sprachen besondere Werte.' },
  { type: 'altGraph', key: '[', symbol: '[', title: 'Finde die eckige Klammer auf.', description: 'Drücke die Tastenkombination für das Zeichen im Übungsfeld.', hint: 'Auf einer deutschen Tastatur ist es meistens AltGr + 8.', fact: 'Eckige Klammern brauchst du zum Beispiel für Listen und Tabellen.' },
  { type: 'altGraph', key: ']', symbol: ']', title: 'Finde die eckige Klammer zu.', description: 'Drücke die Tastenkombination für das Zeichen im Übungsfeld.', hint: 'Auf einer deutschen Tastatur ist es meistens AltGr + 9.', fact: 'Diese Klammer schließt ein Paar eckiger Klammern.' },
  { type: 'altGraph', key: '{', symbol: '{', title: 'Finde die geschweifte Klammer auf.', description: 'Drücke die Tastenkombination für das Zeichen im Übungsfeld.', hint: 'Auf einer deutschen Tastatur ist es meistens AltGr + 7.', fact: 'Geschweifte Klammern gruppieren oft mehrere Befehle in einem Programm.' },
  { type: 'altGraph', key: '}', symbol: '}', title: 'Finde die geschweifte Klammer zu.', description: 'Drücke die Tastenkombination für das Zeichen im Übungsfeld.', hint: 'Auf einer deutschen Tastatur ist es meistens AltGr + 0.', fact: 'Mit der schließenden geschweiften Klammer endet ein Code-Block.' },
  { type: 'altGraph', key: '@', symbol: '@', title: 'Finde das At-Zeichen.', description: 'Drücke die Tastenkombination für das Zeichen im Übungsfeld.', hint: 'Auf einer deutschen Tastatur ist es meistens AltGr + Q.', fact: 'Das @-Zeichen kennst du aus E-Mail-Adressen.' },
  { type: 'altGraph', key: '€', symbol: '€', title: 'Finde das Euro-Zeichen.', description: 'Drücke die Tastenkombination für das Zeichen im Übungsfeld.', hint: 'Auf einer deutschen Tastatur ist es meistens AltGr + E.', fact: 'Das Euro-Zeichen ist auf vielen Tastaturen eine Doppelbelegung.' },
  { type: 'altGraph', key: '\\', symbol: '\\', title: 'Finde den Backslash.', description: 'Drücke die Tastenkombination für das Zeichen im Übungsfeld.', hint: 'Auf einer deutschen Tastatur ist es meistens AltGr + ß.', fact: 'Der Backslash kommt in Dateipfaden und manchen Programmiersprachen vor.' },
];

export function matchesKey(event, mission) {
  if (event.repeat || event.isComposing || event.altKey || event.metaKey) return false;
  if (event.ctrlKey && mission.key !== 'Control') return false;
  if (event.shiftKey && mission.key !== 'Shift' && mission.key.length !== 1) return false;
  return event.key.toLowerCase() === mission.key.toLowerCase();
}

export function matchesExercise(event, exercise) {
  if (event.repeat || event.isComposing) return false;

  if (exercise.type === 'shortcut') {
    const commandKey = event.ctrlKey || event.metaKey;
    const matchesPrimary = !event.shiftKey && event.key.toLowerCase() === exercise.key;
    const matchesAlternate = exercise.alternateKey && event.metaKey && event.shiftKey
      && event.key.toLowerCase() === exercise.alternateKey;
    return Boolean(commandKey && !event.altKey && (matchesPrimary || matchesAlternate));
  }

  if (exercise.type === 'shift') {
    return event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey
      && event.key === exercise.key;
  }

  const altGraph = event.getModifierState?.('AltGraph')
    || (event.ctrlKey && event.altKey)
    || (event.altKey && !event.ctrlKey);
  return Boolean(altGraph && !event.metaKey && event.key === exercise.key);
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
