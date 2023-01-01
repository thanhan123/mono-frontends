import { precacheAndRoute } from "workbox-precaching";
declare let self: ServiceWorkerGlobalScope;
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});
// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("push", (event) => {
  const payload = event.data?.json();

  const promiseChain = self.registration.showNotification(payload.title, {
    body: payload.body,
    icon: payload.icon,
    data: { clickTarget: payload.clickTarget },
  });
  event.waitUntil(promiseChain);
});
