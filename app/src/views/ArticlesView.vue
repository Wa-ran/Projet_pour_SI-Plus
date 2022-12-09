<template>
  <div>
    <ArticlesCreate />
    <div>
      <div>
        <ArticlesBlock
          v-for="(article, index) in $store.state.articlesList"
          :key="index"
          :article="article"
        />
      </div>
      <div>
        <ArticlesChargeButton />
      </div>
    </div>
  </div>
</template>

<script setup>
import ArticlesCreate from "@/components/ArticlesCreate"
import ArticlesBlock from "@/components/ArticlesBlock"
import ArticlesChargeButton from "@/components/ArticlesChargeButton"
</script>

<style lang="scss" scoped>

</style>