<template>
  <div class="container">

    <!-- View of the actual article image, on error => there is no image, so hide the comp -->
    <div v-if="!actualImageError" class="actualImageContainer">
      <div class="title">
        Image actuelle :
      </div>
      <!-- ?key id used to reload the image if an update was committed -->
      <img
        :src="`${constants.serverURL}images/${props.actualArticle?.creationDate}.webp?key=${props.actualArticle?.lastUpdateDate}`"
        alt="Image actuelle"
        @error="actualImageError = true"
      >
      <!-- actual image will be deleted automatically if the article image is updated, so hide this button if user intend to upload a new one -->
      <!-- WIP -->
      <button
        v-if="!newPath"
        @click.prevent="emit('deleteImage')"
      >
        Supprimer (WIP)
      </button>
    </div>

    <div class="previewContainer">
      <div class="title">
          Nouvelle image :
        </div>
      <input
        type="file"
        name="image"
        id="image"
        :key="resetInput"
        accept=".png, .jpeg, .jpg, .webp"
        @change="filePreview"
      />
      <!-- If user select an image to upload, show a preview of it -->
      <img v-if="newPath" :src="newPath" alt="Votre image">
      <button v-if="newPath" @click.prevent="reset">
        Annuler chgmt image
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";
import constants from "@/constants";
const emit = defineEmits(['fileChange', 'deleteImage']);

const props = defineProps({
  actualArticle: {
    type: Object,
  },
});

const file = ref(null); // the image file to upload
const newPath = ref(null); // the path to the user new image
const actualImageError = ref(false);
const resetInput = ref(0);

const filePreview = (event) => {
  file.value = event.target.files[0];
  if (file.value.size > 2097152) {
    reset();
    throw "Image trop volumineuse (2MB max)";
  }
  newPath.value = URL.createObjectURL(event.target.files[0]);
  emit("fileChange", file.value);
}

const reset = () => {
  file.value = newPath.value = null;
  resetInput.value++;
  emit("fileChange", null);
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
.previewContainer, .actualImageContainer {
  display: flex;
  flex-direction: column;
  & .title {
    width: fit-content;
    margin: auto;
    font-style: italic;
  }
}
.actualImageContainer {
  border-bottom: solid 1px black;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
}
#image {
  max-width: 100%;
  max-height: 100%;
  margin-top: 0.75rem;
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