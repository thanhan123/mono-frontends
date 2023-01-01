<script setup lang="ts">
import JobsBoard from "./components/JobsBoard.vue";
import ReloadPWA from "./components/ReloadPWA.vue";
import PushNotificationInfo from "./components/PushNotificationInfo.vue";
</script>

<template>
  <div>
    <ReloadPWA />
    <PushNotificationInfo />
    <JobsBoard />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
