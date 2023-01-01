import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const usePushNotificationSubscriptionStore = defineStore(
  "pushNotificationSubscription",
  () => {
    console.log("***> call usePushNotificationSubscriptionStore")
    const subscription = useStorage<string | null>("subscription", null);
    return { subscription };
  }
);
