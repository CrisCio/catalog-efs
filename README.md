# Catalog EFS

Catalog pentru ora de educație fizică și sport. Merge pe telefon, offline, fără cont. Datele elevilor stau doar pe telefonul profesorului.

## Fișiere

| Fișier | Rol |
|---|---|
| `index.html` | Aplicația (v1.12) |
| `manifest.webmanifest` | Numele, culoarea și iconițele pentru instalare |
| `sw.js` | Ține aplicația disponibilă fără internet |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Iconițe Android |
| `apple-touch-icon.png` | Iconiță iPhone |

## Publicare (GitHub Pages)

1. Urcă toate fișierele în rădăcina repository-ului.
2. Settings → Pages → Branch: `main`, folder `/ (root)`.
3. Deschide linkul pe telefon, în Chrome → ⋮ → „Instalează aplicația”.

## Versiune nouă

1. Înlocuiește `index.html`.
2. În `sw.js` schimbă `CACHE` (ex. `catalog-efs-v1.13`), altfel telefoanele pot păstra versiunea veche.

## Important

Nu urca niciodată copii de siguranță (`catalog-EFS-copie-*.json`) în repository. `.gitignore` le blochează.
