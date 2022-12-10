<template>
  <div>
    <ArticlesForm />
    <div>
      <div>
        <ArticlesBlock
          v-for="article in $store.state.articlesList"
          :key="article.creationDate"
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
import ArticlesForm from "@/components/ArticlesForm"
import ArticlesBlock from "@/components/ArticlesBlock"
import ArticlesChargeButton from "@/components/ArticlesChargeButton"
</script>

<style lang="scss" scoped>

</style>