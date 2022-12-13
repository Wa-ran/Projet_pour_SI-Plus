<template>
  <article>
    <div v-show="imageDisplay" class="imageContainer">
      <img
        :src="`${constants.serverURL}images/${props.article.creationDate}.webp?key=${props.article.creationDate + props.article.lastUpdateDate}`"
        alt=""
        @error="imageDisplay = false"
        @load="imageDisplay = true"
        :key="props.article.lastUpdateDate"
      >
    </div>
    <div class="mainContainer">
      <header>
        <h2>
          {{ props.article.title }}
        </h2>
      </header>
      <div class="textContainer">
        <div class="content">
          {{ props.article.content }}
        </div>
      </div>
      <footer>
        <div class="dateContainer">
          <div>
            {{ `Créé le : ${new Date(props.article.creationDate).toLocaleDateString('fr')} à ${new Date(props.article.creationDate).toLocaleTimeString('fr')}` }}
          </div>
          <div>
            {{ props.article.lastUpdateDate ? `Dernier message le : ${new Date(props.article.lastUpdateDate).toLocaleDateString('fr')} à  ${new Date(props.article.lastUpdateDate).toLocaleTimeString('fr')}` : "" }}
          </div>
        </div>
        <button @click="updateArticle">
          Modifier
        </button>
        <button @click="deleteArticle">
          Supprimer
        </button>
      </footer>
    </div>
  </article>
</template>

<script setup>
import { ref, defineProps, nextTick } from "vue";

const props = defineProps({
  article: {
    type: Object,
  },
});

import { useStore } from "vuex";
const store = useStore();

import constants from "@/constants";

const imageDisplay = ref(true);

const deleteArticle = function() {
  store.dispatch("deleteArticle", { article: props.article })
};
const updateArticle = function() {
  store.commit("mutateStateKey", {
    key: "ArticlesForm_Update",
    value: null // Reset to be sure to trigger watchers
  });
  nextTick(() => store.commit("mutateStateKey", {
      key: "ArticlesForm_Update",
      value: props.article
    })
  )
}
</script>

<style lang="scss" scoped>
article {
  width: 100%;
  max-width: 750px;
  margin: auto;
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: center;
  border-right: solid 1px orangered;
  & > * {
    border: solid 1px orangered;
    border-right: none;
  }
}
.imageContainer {
    border-radius: 0.75rem 0 0 0.75rem;
    overflow: hidden;
    min-width: 150px;
    max-width: 150px;
    min-height: 150px;
    max-height: 150px;
  }
img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.mainContainer {
  width: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
}
header {
  h2 {
    margin: 0.75rem;
    margin-top: 0;
  }
}
.textContainer {
  flex-grow: 1;
  padding-left: 0.5rem;
  padding-bottom: 0.5rem;
}
footer {
  display: flex;
  justify-content: end;
  .dateContainer {
    margin-right: auto;
    margin-top: auto;
    margin-bottom: -0.25rem;
    font-style: italic;
    font-size: 0.9rem;
  }
  > button {
    margin-left: 0.5rem;
    margin-top: auto;
    height: min-content;
  }
}
</style>