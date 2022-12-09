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

<style lang="scss" scoped>

</style>
