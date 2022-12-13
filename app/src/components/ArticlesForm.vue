<template>
  <div
    class="container"
    :class="showForm ? 'showForm' : ''"
  >
    <button v-if="!showForm" @click="showForm = true">
      Créer un post
    </button>
    <form
      v-show="showForm"
      @submit.prevent="submit"
    >
      <div>
        <inputImage
          :key="store.state.ArticlesForm_Update?.creationDate"
          :actualArticle="store.state.ArticlesForm_Update"
          @fileChange="image = $event"
        />
      </div>
      <div class="textInputsContainer">
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
      </div>
      <div class="buttonsContainer">
        <button type="submit">
          Envoyer
        </button>
        <button @click.prevent="reset">
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import inputImage from "./inputImage.vue";

import { ref, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();

const showForm = ref(false);
const title = ref("");
const content = ref("");
const creationDate = ref("");
const image = ref("");

const create = async () => {
  await store.dispatch("postArticle", {
    article: {
      title: title.value,
      content: content.value,
    },
    image: image.value,
  })
  .then(res => store.commit("addArticles", { value: res }))
}
const update = async () => {
  await store.dispatch("updateArticle", {
    article: {
      title: title.value,
      content: content.value,
      creationDate: creationDate.value,
    },
    image: image.value,
  })
  .then(res => store.commit("modifyArticle", { value: res }))
}

const reset = () => { // Hide form and don't save changes
  showForm.value = false;
  title.value = content.value = creationDate.value = image.value = "";
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
.container.showForm {
  border-bottom: solid 2px black;
  padding-bottom: 0.25rem;
}
.textInputsContainer {
  display: flex;
  justify-content: center;
  textarea {
    margin: 0.25rem;
    border: solid 1px orangered;
    border-radius: 0.25rem;
  }
}
.buttonsContainer {
  width: 100%;
  display: flex;
  justify-content: end;
  button {
    margin: 0.25rem;
  }
}
</style>