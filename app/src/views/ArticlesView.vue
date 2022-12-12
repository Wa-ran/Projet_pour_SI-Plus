<template>
  <div class="container">
    <ArticlesForm />
    <main>
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
    </main>
  </div>
</template>

<script setup>
import ArticlesForm from "@/components/ArticlesForm"
import ArticlesBlock from "@/components/ArticlesBlock"
import ArticlesChargeButton from "@/components/ArticlesChargeButton"
</script>

<style lang="scss">
body {
  margin: 0;
}
main {
  padding: 1rem 2.5%;
}
</style>