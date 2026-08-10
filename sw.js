// ==================================================
// TEAM SØR SERVICE WORKER
// PWA CACHE + ONESIGNAL PUSH
// ==================================================




// ==================================================
// CACHE
// ==================================================

const CACHE_NAME = "team-sor-v44";

const FILES = [
    "./",
    "./index.html",
    "./gerica.css",
    "./app.js",
     "./ansatteFirestore.js",
    "./manifest.json",
    "./images/logo-192.png",
    "./images/logo-512.png"
];


// ==================================================
// INSTALL
// ==================================================

self.addEventListener("install", event => {

    console.log("TEAM SØR SERVICE WORKER INSTALLERES");

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => {

                return cache.addAll(FILES);

            })

            .then(() => {

                return self.skipWaiting();

            })

    );

});


// ==================================================
// ACTIVATE
// ==================================================

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

            .then(keys => {

                return Promise.all(

                    keys.map(key => {

                        if (key !== CACHE_NAME) {

                            return caches.delete(key);

                        }

                    })

                );

            })

            .then(() => {

                console.log("TEAM SØR SERVICE WORKER AKTIVERT");

                return self.clients.claim();

            })

    );

});


// ==================================================
// FETCH
// ==================================================

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(response => {

                return response || fetch(event.request);

            })

    );

});