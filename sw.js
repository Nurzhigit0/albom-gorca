// Офлайн-кэш «Альбома Горца». При изменении файлов увеличьте VERSION.
const VERSION = "v3";
const CORE = [
"./",
"index.html",
"points-data.js",
"jszip.min.js",
"manifest.webmanifest",
"seed.json",
"icons/icon-192.png",
"icons/icon-512.png",
"icons/apple-touch-icon.png",
"covers/gorizont-01.jpg",
"covers/gorizont-02.jpg",
"covers/gorizont-03.jpg",
"covers/gorizont-04.jpg",
"covers/gorizont-05.jpg",
"covers/gorizont-06.jpg",
"covers/gorizont-07.jpg",
"covers/gorizont-08.jpg",
"covers/gorizont-09.jpg",
"covers/gorizont-10.jpg",
"covers/gorizont-11.jpg",
"covers/gorizont-12.jpg",
"covers/gorizont-13.jpg",
"covers/gorizont-14.jpg",
"covers/gorizont-15.jpg",
"covers/gorizont-16.jpg",
"covers/gorizont-17.jpg",
"covers/gorizont-18.jpg",
"covers/gorizont-19.jpg",
"covers/gorizont-20.jpg",
"covers/gorizont-21.jpg",
"covers/kaskad-01.jpg",
"covers/kaskad-02.jpg",
"covers/kaskad-03.jpg",
"covers/kaskad-04.jpg",
"covers/kaskad-05.jpg",
"covers/kaskad-06.jpg",
"covers/kaskad-07.jpg",
"covers/kaskad-08.jpg",
"covers/kaskad-09.jpg",
"covers/kaskad-10.jpg",
"covers/kaskad-11.jpg",
"covers/kaskad-12.jpg",
"covers/kaskad-13.jpg",
"covers/kaskad-14.jpg",
"covers/kaskad-15.jpg",
"covers/kaskad-16.jpg",
"covers/kaskad-17.jpg",
"covers/kaskad-18.jpg",
"covers/kaskad-19.jpg",
"covers/kaskad-20.jpg",
"covers/kaskad-21.jpg",
"covers/mirazh-01.jpg",
"covers/mirazh-02.jpg",
"covers/mirazh-03.jpg",
"covers/mirazh-04.jpg",
"covers/mirazh-05.jpg",
"covers/mirazh-06.jpg",
"covers/mirazh-07.jpg",
"covers/mirazh-08.jpg",
"covers/mirazh-09.jpg",
"covers/mirazh-10.jpg",
"covers/mirazh-11.jpg",
"covers/mirazh-12.jpg",
"covers/mirazh-13.jpg",
"covers/mirazh-14.jpg",
"covers/mirazh-15.jpg",
"covers/mirazh-16.jpg",
"covers/mirazh-17.jpg",
"covers/mirazh-18.jpg",
"covers/mirazh-19.jpg",
"covers/mirazh-20.jpg",
"covers/mirazh-21.jpg",
"covers/podzemele-01.jpg",
"covers/podzemele-02.jpg",
"covers/podzemele-03.jpg",
"covers/podzemele-04.jpg",
"covers/podzemele-05.jpg",
"covers/podzemele-06.jpg",
"covers/podzemele-07.jpg",
"covers/podzemele-08.jpg",
"covers/podzemele-09.jpg",
"covers/podzemele-10.jpg",
"covers/podzemele-11.jpg",
"covers/podzemele-12.jpg",
"covers/podzemele-13.jpg",
"covers/podzemele-14.jpg",
"covers/podzemele-15.jpg",
"covers/podzemele-16.jpg",
"covers/podzemele-17.jpg",
"covers/podzemele-18.jpg",
"covers/podzemele-20.jpg",
"covers/podzemele-21.jpg"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open("app-" + VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== "app-" + VERSION && k !== "fonts").map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")) {
    e.respondWith(caches.open("fonts").then(async c => {
      const hit = await c.match(e.request);
      const net = fetch(e.request).then(r => { if (r.ok || r.type === "opaque") c.put(e.request, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open("app-" + VERSION).then(c => c.put("./", copy)); return r; }).catch(() => caches.match("./")));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
