<template>
  <div>
    <div>
      <img src="" alt="">
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
        {{ props.article.updateDate }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  article: {
    type: Object,
  },
});
</script>

<style lang="scss" scoped>

</style>