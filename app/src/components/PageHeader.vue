<template>
  <header>
    <form @submit.prevent="login">
      <div>
        <input
          type="text"
          placeholder="Pseudo"
          aria-label="Pseudo"
          name="name"
          id="name"
          v-model="name"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          aria-label="Mot de passe"
          name="password"
          id="password"
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

const name = ref('');
const password = ref('');
const login = function() {
  store.dispatch("login", {
    name: name.value,
    password: password.value
  })
}
</script>

<style lang="scss" scoped>

</style>