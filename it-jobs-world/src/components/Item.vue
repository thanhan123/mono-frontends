<script setup lang="ts">
import { ref } from "vue";
defineProps<{ title: string }>();
</script>

<template>
  <div class="item">
    <h1>{{ title }}</h1>
  </div>
</template>