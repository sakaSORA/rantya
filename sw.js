/**
 * 3-Nin Launcher V24.1 - Service Worker
 * 更新時は CACHE_NAME を変更してアップロードしてください。
 */
const CACHE_NAME = '3-nin-launcher-v21';

// キャッシュするリソースのリスト
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-512.png',
  // 追加したシンボル画像もキャッシュに含める
  './bg-default.png',
  './bg-blue.png',
  './bg-brown.png',
  './bg-green.png',
  './bg-pink.png',
  './bg-slate.png'
];

// インストール処理
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// アクティベート処理（古いキャッシュの削除）
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// フェッチ処理（ネットワーク優先、失敗時にキャッシュ）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
