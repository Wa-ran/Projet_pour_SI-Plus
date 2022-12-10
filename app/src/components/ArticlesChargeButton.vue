<template>
  <div>
    <button @click="chargeArticles">Charge</button>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();

const chargeArticles = async () => {
  store.dispatch("getMultipleArticles")
  .then(res => store.commit("addArticles", { value: res }))
}
</script>

<style lang="scss" scoped>

</style>