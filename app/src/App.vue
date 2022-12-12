<template>
  <div>
    <PageHeader />
    <main>
      <ArticlesView v-show="$store.state.connected" />
    </main>
  </div>
</template>

<script setup>
import PageHeader from "@/components/PageHeader"
import ArticlesView from "@/views/ArticlesView"
</script>

<style lang="scss">
html {
  background-color: rgba(orangered, 0.05);
}
button {
  background-color: rgba($color: orangered, $alpha: 0.75);
  border: 1px solid black;
  border-radius: 0.25rem;
  font-weight: bold;
  padding: 0.15rem 1rem;
}
</style>
