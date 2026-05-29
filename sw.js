/* Strass&Go — Service Worker
   @ By Brice Jct · Alpha OS · Groupe Alpha Nex Strasbourg
   - Cache "app shell" pour ouverture instantanée + hors-ligne
   - Géométrie réseau (data.strasbourg.eu) en stale-while-revalidate
   - Données live (SIRI/tuiles/météo) : réseau direct (jamais mises en cache)
   - Clic sur notification : ouvre/réactive l'app */
const CACHE = "strassgo-v3";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL).catch(() => {})));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }

  // Live data → réseau direct, pas de cache
  if (url.hostname.includes("arcgisonline") ||
      url.hostname.includes("open-meteo") ||
      url.hostname.includes("workers.dev") ||
      url.pathname.includes("/siri/") ||
      url.pathname.includes("/cts/")) {
    return; // laisse le navigateur gérer
  }

  // Géométrie réseau (tram + bus) → stale-while-revalidate
  if (url.hostname.includes("data.strasbourg.eu")) {
    e.respondWith(caches.open(CACHE).then(async c => {
      const cached = await c.match(req);
      const net = fetch(req).then(r => { try { c.put(req, r.clone()); } catch (_) {} return r; })
                            .catch(() => cached);
      return cached || net;
    }));
    return;
  }

  // App shell → cache d'abord, réseau ensuite, repli index.html
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (url.origin === location.origin) {
        const cp = r.clone();
        caches.open(CACHE).then(c => c.put(req, cp)).catch(() => {});
      }
      return r;
    }).catch(() => caches.match("./index.html")))
  );
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) { if ("focus" in c) return c.focus(); }
    if (clients.openWindow) return clients.openWindow("./");
  }));
});
