/* Catalog EFS – service worker
   Ține aplicația disponibilă fără internet. Datele elevilor NU trec pe aici:
   ele stau în IndexedDB, pe telefon, și nu sunt atinse de cache.
   La fiecare versiune nouă schimbă CACHE (ex. "catalog-efs-v1.13"), ca telefoanele să ia fișierele noi. */
const CACHE = "catalog-efs-v1.12";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

/* Pagina: întâi internetul (ca să vină versiunea nouă), iar fără internet, din cache.
   Restul fișierelor (iconițe, manifest): întâi din cache. */
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => {
      const copy = r.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)); return r;
    }).catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return r;
  })));
});
