# PICO Playground

Ein deutschsprachiger Browser-Trainer für Fünftklässler auf dem Weg zum eigenen PICO-8-Spiel. Level 01 ist ein Tastensprint: Die Stoppuhr läuft, bis alle verschiedenen Tasten gefunden sind. Level 02 übt Tastenkürzel sowie Shift- und AltGr-Doppelbelegungen direkt in einem Textfeld.

## Lokal starten

Node.js ab Version 20, empfohlen 22 oder neuer. Keine Installation von Abhängigkeiten nötig.

```sh
npm run dev
```

Im Browser <http://127.0.0.1:5173> öffnen. Die Anwendung benötigt JavaScript und eine moderne Browser-Version (Chrome, Edge, Firefox oder Safari). Dateien wegen der JavaScript-Module über den lokalen Server öffnen, nicht per Doppelklick.

```sh
npm test
npm run build
node scripts/serve.mjs --dist
```

Der Build kopiert ausschließlich die Website in `dist/`. Alle Asset-URLs sind relativ; die Anwendung läuft auch unter dem GitHub-Projektpfad `/pico8-trainer/`.

## Veröffentlichung auf GitHub Pages

Der [Workflow](.github/workflows/deploy.yml) prüft Pull Requests und veröffentlicht nach jedem Push auf `main`, sofern die Tests erfolgreich sind. Manuelle Ausführung über „Actions → Test and deploy to GitHub Pages → Run workflow“ ist ebenfalls möglich.

Einmalig im Repository **Settings → Pages → Build and deployment → Source → GitHub Actions** auswählen. GitHub Actions muss für das Repository freigegeben sein. Danach die Projektdateien committen und auf `main` pushen. Der erste erfolgreiche Deploy stellt die Seite unter folgender Adresse bereit:

<https://fpiesik.github.io/pico8-trainer/>

Diese Adresse ist die vorgesehene Zieladresse; das Anlegen der lokalen Dateien allein veröffentlicht die Seite noch nicht. Die tatsächliche Deployment-URL erscheint im Workflow und unter Settings → Pages. Falls GitHub für die Umgebung `github-pages` eine Freigabe verlangt, muss sie im Repository passend zum gewünschten automatischen Betrieb eingerichtet werden.

## Lernen und Bedienung

- Level 01: Zwölf verschiedene Tasten werden in zufälliger Reihenfolge gesucht. Die Stoppuhr stoppt erst nach dem letzten Treffer; nach jedem Treffer geht es automatisch weiter. Die Bestzeit wird getrennt für echte Tastatur und Bildschirmmodus gespeichert.
- Level 02 wird nach dem ersten Sprint freigeschaltet und übt Strg/Command + A, C, V, X, Z und Y sowie Shift- und AltGr-Zeichen wie `_`, `=`, `?`, Klammern, `@` und `€`.
- „Ein kleiner Tipp“ erklärt die gesuchte Taste oder Tastenkombination.
- Level 1 funktioniert mit echter Tastatur oder im Bildschirmmodus. Level 2 benötigt eine echte Tastatur und nutzt ein lokales Textfeld zum Ausprobieren der Kürzel.
- Die abgebildete Tastatur ist eine vereinfachte deutsche QWERTZ-Orientierung, keine maßstabsgetreue Abbildung jedes Geräts. Buchstaben werden über `KeyboardEvent.key` erkannt, damit andere Layouts funktionieren. Linke und rechte Umschalt-/Strg-Tasten zählen gleichermaßen.
- Tab bleibt für die Navigation frei; Browserkürzel werden nicht abgefangen. Hilfe ist über den Fragezeichen-Knopf erreichbar.
- „Neu starten“ startet die aktuelle Übung von vorn. Auf gemeinsam genutzten Schulrechnern vor einem Schülerwechsel den Browser-Speicher löschen.
- `localStorage` speichert ausschließlich die Bestleistungen pro Level-1-Modus und den Zugang zu Level 2. Keine Namen, Konten, Cookies, externen Schriftarten, Analytics oder Netzwerkanfragen der Anwendung. Bei blockiertem Speicher bleibt das Spiel nutzbar; GitHub Pages selbst verarbeitet als Hosting-Anbieter Verbindungsdaten.
- Auf kleinen Bildschirmen kann die Tastatur horizontal gescrollt werden. Animationen beachten „Bewegung reduzieren“.

## Weiterentwickeln

- [src/game.js](src/game.js): Missionen, Tastaturbelegung, Erkennung und Validierung gespeicherter Fortschritte.
- [src/app.js](src/app.js): Oberfläche, Spielzustände, Tastaturereignisse und Speicherung.
- [src/styles.css](src/styles.css): responsives Design ohne externe Assets.
- [tests/game.test.js](tests/game.test.js): automatisierte Tests für Lerninhalte, Tastenerkennung und Speicherstände.

Nächster Lernschritt: Pixelgrafik, erste PICO-8-Befehle, Geschichten und Sounds.

PICO Playground ist ein eigenständiges Lernprojekt und kein offizielles Produkt von PICO-8 oder Lexaloffle.
-
