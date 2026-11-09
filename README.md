# PICO Playground

Ein deutschsprachiger Browser-Trainer für Fünftklässler auf dem Weg zum eigenen PICO-8-Spiel. Level 01 führt ohne Zeitdruck durch zwölf Tasten und erklärt nach jedem Treffer, wozu sie dienen. Programmierung, Grafikdesign, Storytelling und Sounddesign bilden die langfristige Lernreise; weitere Level sind aktuell als „In Vorbereitung“ gekennzeichnet.

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

- Zwölf Missionen: Leertaste, Enter, vier Pfeiltasten, Escape, Umschalt, Strg, Rücktaste, A und Z.
- „Ein kleiner Tipp“ erklärt die Lage und hebt die gesuchte Taste hervor.
- Nach jedem Treffer bleibt die Erklärung stehen, bis „Nächste Taste“ gewählt wird.
- Keine Zeitbegrenzung, Punktabzüge oder Ranglisten.
- Echte Tastatur als Standard. Der Bildschirmmodus funktioniert mit Maus oder Touch und speichert einen eigenen Fortschritt.
- Die abgebildete Tastatur ist eine vereinfachte deutsche QWERTZ-Orientierung, keine maßstabsgetreue Abbildung jedes Geräts. Buchstaben werden über `KeyboardEvent.key` erkannt, damit andere Layouts funktionieren. Linke und rechte Umschalt-/Strg-Tasten zählen gleichermaßen.
- Tab bleibt für die Navigation frei; Browserkürzel werden nicht abgefangen. Hilfe ist über den Fragezeichen-Knopf erreichbar.
- „Neu starten“ setzt den aktuellen Modus zurück. Auf gemeinsam genutzten Schulrechnern vor einem Schülerwechsel neu starten.
- `localStorage` speichert ausschließlich die Anzahl gefundener Tasten pro Modus. Keine Namen, Konten, Cookies, externen Schriftarten, Analytics oder Netzwerkanfragen der Anwendung. Bei blockiertem Speicher bleibt das Spiel nutzbar; GitHub Pages selbst verarbeitet als Hosting-Anbieter Verbindungsdaten.
- Auf kleinen Bildschirmen kann die Tastatur horizontal gescrollt werden. Animationen beachten „Bewegung reduzieren“.

## Weiterentwickeln

- [src/game.js](src/game.js): Missionen, Tastaturbelegung, Erkennung und Validierung gespeicherter Fortschritte.
- [src/app.js](src/app.js): Oberfläche, Spielzustände, Tastaturereignisse und Speicherung.
- [src/styles.css](src/styles.css): responsives Design ohne externe Assets.
- [tests/game.test.js](tests/game.test.js): automatisierte Tests für Lerninhalte, Tastenerkennung und Speicherstände.

Nächster Lernschritt: Copy & Paste und Rückgängigmachen in einem sicheren Übungsfeld. Danach Pixelgrafik, erste PICO-8-Befehle, Geschichten und Sounds. Diese Funktionen sind noch nicht implementiert.

PICO Playground ist ein eigenständiges Lernprojekt und kein offizielles Produkt von PICO-8 oder Lexaloffle.
