const staticCacheName = 's-app-v29';
const dynamicCacheName = 'd-app-v29-1'

const assetsUrls = [
    'index.html',
    '/js/app.js',
    '/css/main.css',
    '/js/classes.js',
    'offline.html',
]
self.addEventListener('install', async (e) => {
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assetsUrls)
    // e.waitUntil(
    //     caches.open(staticCacheName).then(cache => cache.addAll(assetsUrls))
    // )

})

self.addEventListener('activate', async (e) => {
    const cacheName = await caches.keys();

    await Promise.all(
        cacheName
            .filter(name => name !== staticCacheName)
            .filter(name => name !== dynamicCacheName)
            .map(name => caches.delete(name))
    )
})

self.addEventListener('fetch', (e) => {
    const { request } = e;
    const url = new URL(request.url);
    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(request))

    } else {
        e.respondWith(networkFirst(request))
    }
})

async function cacheFirst(request) {
    const cached = await caches.match(request);
    return cached ?? await fetch(request)
}

async function networkFirst(request) {
    const cache = await caches.open(dynamicCacheName)

    try {
        const response = await fetch(request)
        await cache.put(request, response.clone());
        return response
    } catch (error) {
        const cached = await cache.match(request);
        return cached ?? await caches.match('/offline.html')
    }
}