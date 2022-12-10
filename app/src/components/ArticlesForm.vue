<template>
  <div>
    <button @click="reset">
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
import { ref, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();

const showForm = ref(false);
const title = ref("");
const content = ref("");
const creationDate = ref("");

const create = async () => {
  await store.dispatch("postArticle", {
    article: {
      title: title.value,
      content: content.value
    }
  })
  .then(res => store.commit("addArticles", { value: res }))
}
const update = async () => {
  await store.dispatch("updateArticle", {
    article: {
      title: title.value,
      content: content.value,
      creationDate: creationDate.value,
    }
  })
  .then(res => store.commit("modifyArticle", { value: res }))
}

const reset = () => { // Hide form and don't save changes
  showForm.value = false;
  title.value = "";
  content.value = "";
  creationDate.value = "";
};

const submit = async () => {
  await (creationDate.value ? update() : create())
  .then(() => reset())
}

watch(() => store.state.ArticlesForm_Update, () => {
  let update = store.state.ArticlesForm_Update;
  if (update) {
    reset();
    title.value = update.title;
    content.value = update.content;
    creationDate.value = update.creationDate;
    showForm.value = true;
  }
})
</script>

<style lang="scss" scoped>

</style>