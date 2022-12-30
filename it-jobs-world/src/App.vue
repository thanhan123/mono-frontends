<script setup lang="ts">
import JobsBoard from "./components/JobsBoard.vue";
import ReloadPWA from "./components/ReloadPWA.vue";
import { useRegisterSW } from 'virtual:pwa-register/vue'

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW({
  onRegisteredSW(swUrl) {
    // eslint-disable-next-line no-console
    console.log(`Service Worker at: ${swUrl}`)
  },
})

</script>

<template>
  <div>
    <ReloadPWA />
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
