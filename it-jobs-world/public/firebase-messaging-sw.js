self.addEventListener('push', event => {
  const payload = event.data?.json();

  const notification = payload.notification
  const promiseChain = self.registration.showNotification(notification.title, {
    body: notification.body,
    icon: notification.icon,
    data: { clickTarget: payload.clickTarget },
  });
  event.waitUntil(promiseChain);
});
