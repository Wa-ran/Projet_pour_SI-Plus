<template>
  <div class="container">
    <div>
      <img
        :src="`${constants.serverURL}images/${props.article.creationDate}.webp`" alt=""
        onerror='this.style.display = "none"'
      >
    </div>
    <div>
      <h2>
        {{ props.article.title }}
      </h2>
      <div class="content">
        {{ props.article.content }}
      </div>
      <div>
        {{ props.article.creationDate }}
      </div>
      <div>
        {{ props.article.lastUpdateDate || "never modified" }}
      </div>
    </div>
    <button @click="updateArticle">
      Modify
    </button>
    <button @click="deleteArticle">
      Delete
    </button>
  </div>
</template>

<script setup>
import { defineProps, nextTick } from "vue";

const props = defineProps({
  article: {
    type: Object,
  },
});

import { useStore } from "vuex";
const store = useStore();

import constants from "@/constants";

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
.container {
  border: solid 1px orangered;
}

img {
  width: 100px;
  height: 100px;
}
</style>