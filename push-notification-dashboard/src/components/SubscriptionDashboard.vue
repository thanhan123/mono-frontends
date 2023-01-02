<template>
  <div>
    <label>Subscription id</label>
    <br />
    <input placeholder="Input subscription id" type="text" v-model="subscriptionId" />
    <br />
    <label>Title</label>
    <br />
    <input placeholder="Type the title" type="text" v-model="title" />
    <br />
    <label>Body</label>
    <br />
    <input placeholder="Type the body" type="text" v-model="body" />
    <br />
    <button  class="button" @click="sendPush()">
      Send me a Push Notification
    </button>
  </div>
</template>

<script setup lang="ts">
import { sendPushNotification } from "../scripts/PushAPI";
import { ref } from "vue";

const subscriptionId = ref<string | null>()
const title = ref<string | null>()
const body = ref<string | null>()

const sendPush = async () => {
  if (subscriptionId.value) {
    sendPushNotification(subscriptionId.value, title.value, body.value); 
  } 
};

</script>
