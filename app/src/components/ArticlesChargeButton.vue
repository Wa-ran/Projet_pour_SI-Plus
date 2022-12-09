<template>
  <div>
    <button @click="charge">Charge</button>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();

const charge = function() {
  store.dispatch("getMultipleArticles")
}
</script>

<style lang="scss" scoped>

</style>