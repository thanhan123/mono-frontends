<template>
  <div v-if="!isPushNotificationSupported">
    <p>Push notification is not supported for this browser</p>
  </div>
  <div v-else-if="store.subscription">
    <button  class="button" @click="sendPush()">
      Send me a Push Notification
    </button>
    <p class="button mt-2" @click="onClickSubscriptionInfo()">
      Push subscription id: {{ store.subscription }}
    </p>
  </div>
  <button v-else class="button" @click="askPermission()">Allow push notification</button>
</template>

<script setup lang="ts">
import { askPermission } from "../scripts/PushNotification";
import { sendPushNotification } from "../scripts/PushAPI";
import { usePushNotificationSubscriptionStore } from "../scripts/store/PushNotificationSubscriptionStore";

const store = usePushNotificationSubscriptionStore();

const sendPush = async () => {
  if (store.subscription) {
    sendPushNotification(store.subscription);
  }
};

const onClickSubscriptionInfo = () => {

}

const isPushNotificationSupported = "Notification" in window;
</script>
