<template>
  <div v-if="!isPushNotificationSupported">
    <p>Push notification is not supported for this browser</p>
  </div>
  <button v-else-if="store.subscription" class="button" @click="sendPush()">
    Send me a Push
  </button>
  <button v-else class="button" @click="askPermission()">Allow for push</button>
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

const isPushNotificationSupported = "Notification" in window;
</script>
