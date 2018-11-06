var staticCacheName = 'Restaurant-Cahce';

let CashURL = [
    '/',
    '/img/1.jpg', '/img/2.jpg', '/img/3.jpg', '/img/4.jpg', '/img/5.jpg',
    '/img/6.jpg', '/img/7.jpg', '/img/8.jpg', '/img/9.jpg', '/img/10.jpg',
    '/js/main.js', '/restaurant.html', '/css/styles.css', '/data/restaurants.json',
    '/js/restaurant_info.js','/js/dbhelper.js', '/index.html',
];

// Start of : Installing function

self.addEventListener('install', function (e) 
{
    console.log('Woow, It works Well :D');

    e.waitUntil(
        caches.open(staticCacheName).then(function (cache) 
        {
            console.log(cache);
            return cache.addAll(CashURL);

        }).catch(error => 
        {
            console.log(error);
        })
    );
});

// End of : Installing function

// Start of : Activating function

self.addEventListener('activate', function (e) 
{
    e.waitUntil(
        caches.keys().then(function (NamesofCash) 
        {
            return Promise.all(
                NamesofCash.filter(function (cacheName) 
                {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != staticCacheName;
                }).map(function (cacheName) 
                {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// End of : Activating function

// Start of : Fetching function

self.addEventListener('fetch', function (e)
 {
    e.respondWith(
        caches.match(e.request).then(function (response) 
        {
            return fetch(e.request) || response;
        })
    );
});

// End of : Fetching function
