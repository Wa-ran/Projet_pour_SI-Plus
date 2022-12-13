<template>
  <div class="container">
    <input
      type="file"
      name="image"
      id="image"
      accept=".png, .jpeg, .jpg, .webp"
      @change="filePreview"
    />
    <div v-if="path" class="previewContainer">
      <img v-if="path" :src="path" alt="Votre image">
      <button @click="path = null">
        Annuler
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const emit = defineEmits(['fileChange']);

const file = ref(null);
const path = ref(null);

const filePreview = (event) => {
  file.value = event.target.files[0];
  if (file.value.size > 2097152) {
    event.target.value = file.value = path.value = null;
    throw "Image trop volumineuse (2MB max)";
  }
  path.value = URL.createObjectURL(event.target.files[0]);
  emit("fileChange", file.value);
}
</script>

<style lang="scss" scoped>
.container {
  margin: 1rem auto;
  padding: 0.5rem;
  width: fit-content;
  border: solid 1px rgba($color: orangered, $alpha: 0.5);
  border-radius: 0.5rem;
}
.previewContainer {
  display: flex;
  flex-direction: column;
}
.input[type=file] {
  max-width: 100%;
  max-height: 100%;
}
img {
  max-width: 150px;
  max-height: 150px;
  border: solid 1px black;
  margin: 1rem auto;
  background-color: #fff;
}
button {
  max-width: fit-content;
  margin-left: auto;
}
</style>