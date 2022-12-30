export const askPermission = () => {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // const notification = new Notification("Hi there!");
    console.log("***> permission granted")
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        subscribeUserToPush()
        .then(sendSubscriptionToBackEnd)
        .then(() => {
          console.log("***> sending successfully")
        })
        .catch(error => {
          console.log("***> sending failed", error)
        })
      }
    });
  }
}

function urlBase64ToUint8Array(base64String: string) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


function subscribeUserToPush() {
  return navigator.serviceWorker.getRegistration().then(registration => {
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        'BGPzQtLSP-5QQ07d-A6bhGQHJJTq6mIVCA-P8hCmlm_iZIYZWtUcgz7XtIchfmlacSMBcH-NJ4XZJ74Q55iWQaw',
      ),
    };
    if (registration) {
      console.log("***> registration", registration)
      return registration.pushManager.subscribe(subscribeOptions)
    }
    throw new Error("No registration") 
  })
  .then(pushSubscription => {
    console.log(
      'Received PushSubscription: ',
      JSON.stringify(pushSubscription),
    );
    return pushSubscription;
  });
   
}

function sendSubscriptionToBackEnd(subscription: PushSubscription) {
  return fetch('/api/save-subscription/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Bad status code from server.');
      }

      return response.json();
    })
    .then(function (responseData) {
      if (!(responseData.data && responseData.data.success)) {
        throw new Error('Bad response from server.');
      }
    });
}