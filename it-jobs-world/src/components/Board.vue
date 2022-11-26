<script setup lang="ts">
import Item from "./Item.vue";
import { check } from "@core-common/check";
</script>

<template>
  <div>
    <h1>World Jobs</h1>
  <h2 class="notice">{{check()}}</h2>
  <div class="board">
    <Item title="title" />
    <Item title="title2" />
    <Item title="title3" />
    <Item title="title4" />
    <Item title="title5" />
    <Item title="title6" />
    <Item title="title7" />
    <Item title="title8" />
    <Item title="title9" />
    <Item title="title10" />
  </div>
  </div>
</template>