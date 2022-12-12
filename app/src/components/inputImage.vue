<template>
  <div>
    <input
      type="file"
      name="image"
      id="image"
      accept=".png, .jpeg, .jpg, .webp"
      @change="filePreview"
    />
    <div v-if="path">
      <button @click="path = null">
        Annuler
      </button>
      <img v-if="path" :src="path" alt="Votre image">
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
.input[type=file] {
  width: 200px;
  height: 200px;
}
</style>