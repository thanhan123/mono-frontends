<script setup lang="ts">
import JobItem from "./JobItem.vue";
import { check } from "@core-common/check";
</script>

<template>
  <div>
    <h1>World Jobs</h1>
    <h2 class="notice">{{ check() }}</h2>
    <div class="board">
      <JobItem title="title" />
      <JobItem title="title2" />
      <JobItem title="title3" />
      <JobItem title="title4" />
      <JobItem title="title5" />
      <JobItem title="title6" />
      <JobItem title="title7" />
      <JobItem title="title8" />
      <JobItem title="title9" />
      <JobItem title="title10" />
    </div>
  </div>
</template>
