<template>
  <header>
    <form @submit.prevent="submit">
      <div>
        <input
          type="text"
          placeholder="Pseudo"
          aria-label="Pseudo"
          name="PageHeaderPseudo"
          id="PageHeaderPseudo"
          v-model="pseudo"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          aria-label="Mot de passe"
          name="PageHeaderPassword"
          id="PageHeaderPassword"
          v-model="password"
        />
      </div>
      <button type="submit">
        Connexion
      </button>
    </form>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const pseudo = ref('');
const password = ref('');
const submit = function() {
  store.dispatch("login", {
    pseudo: pseudo.value,
    password: password.value
  })
}
</script>

<style lang="scss" scoped>

</style>