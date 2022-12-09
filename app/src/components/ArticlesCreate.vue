<template>
  <div>
    <button @click="showForm = ! showForm">
      {{ showForm ? "Annuler" : "Créer un post" }}
    </button>
    <form
      v-show="showForm"
      @submit.prevent="submit"
    >
      <textarea
        placeholder="Titre"
        aria-label="Titre"
        name="title"
        id="ArticleCreateTitle"
        v-model="title"
      />
      <textarea
        placeholder="Contenu"
        aria-label="Titre"
        name="content"
        id="ArticleCreateContent"
        v-model="content"
      />
      <button type="submit">
        Envoyer
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const showForm = ref(false);
const title = ref("");
const content = ref("");

const submit = function() {
  store.dispatch("postArticle", {
    title: title.value,
    content: content.value
  })
}
</script>

<style lang="scss" scoped>

</style>