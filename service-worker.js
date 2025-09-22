const CACHE_NAME = 'drsplay-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Adicione aqui outros arquivos importantes se tiver (CSS, outras imagens, etc.)
];

// Evento de Instalação: Salva os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: Responde com o cache se estiver offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se encontrar no cache, retorna a resposta do cache
        if (response) {
          return response;
        }
        // Se não, busca na rede
        return fetch(event.request);
      })
  );
});