import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const usePushNotificationSubscriptionStore = defineStore(
  "pushNotificationSubscription",
  () => {
    const subscription = useStorage<string | null>("subscription", null);
    return { subscription };
  }
);
