/**
 * VueJS PWA: Cache Busting
 * https://medium.com/js-dojo/vuejs-pwa-cache-busting-8d09edd22a31
 */

workbox.core.setCacheNameDetails({ prefix: 'bca-time-table' });

const LATEST_VERSION = 'v2019.05.01';

self.addEventListener('activate', (event) => {
  console.log(`%c ${LATEST_VERSION} `, 'background: #388e3c; color: #fff');
  if (caches) {
    caches.keys().then((arr) => {
      arr.forEach((key) => {
        if (key.indexOf('bca-time-table') < -1) {
          caches
            .delete(key)
            .then(() =>
              console.log(
                `%c Cleared ${key}`,
                'background: #00bcd4; color: #fff'
              )
            );
        } else {
          caches.open(key).then((cache) => {
            cache.match('version').then((res) => {
              if (!res) {
                cache.put(
                  'version',
                  new Response(LATEST_VERSION, {
                    status: 200,
                    statusText: LATEST_VERSION,
                  })
                );
              } else if (res.statusText !== LATEST_VERSION) {
                caches
                  .delete(key)
                  .then(() =>
                    console.log(
                      `%c Cleared cache ${LATEST_VERSION} `,
                      'background: #00bcd4; color: #fff'
                    )
                  );
              } else
                console.log(
                  `%c Great, you have the latest update ${LATEST_VERSION} `,
                  'background: #388e3c; color: #fff'
                );
            });
          });
        }
      });
    });
  }
});

workbox.skipWaiting();
workbox.clientsClaim();

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
