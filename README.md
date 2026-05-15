# Companion Prototype

Mobile web prototype for the Companion investor demo.

## Structure

- `index.html` keeps only the phone shell and script/style entrypoints.
- `styles.css` contains the full visual system and page styling.
- `src/app/` contains shared state, navigation, actions, and runtime event wiring.
- `src/components/` contains shared visual helpers.
- `src/pages/` contains page-level render templates.
- `assets/prototype/` contains local images referenced by the prototype.

## Single-file build

Generate a self-contained HTML file that can be opened directly in a browser:

```bash
node scripts/build-single-file.mjs
open dist/companion.html
```

The build inlines CSS, JavaScript, and local `assets/...` images as data URLs.
