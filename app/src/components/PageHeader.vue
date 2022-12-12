<template>
  <header>
    <form
      v-if="!store.state.connected"
      @submit.prevent="showForm ? submit() : showForm = true"
      :class="showForm ? 'showForm' : ''"
    >
      <div
        v-if="showForm"
        class="inputContainer"
      >
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
        {{ showForm ? "Valider" : "Connexion" }}
      </button>
    </form>
    <div v-else>
      {{ `Bienvenue, ${pseudo}` }}
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const showForm = ref(false);

const pseudo = ref('');
const password = ref('');
const submit = function() {
  store.dispatch("login", {
    user: {
      pseudo: pseudo.value,
      password: password.value
    }
  })
}
</script>

<style lang="scss" scoped>
header {
  background-color: rgba($color: orangered, $alpha: 0.05);
  border-bottom: solid 1px orangered;
  padding: 0.5rem;
}
form {
  width: 100%;
  display: flex;
  justify-content: end;
  &.showForm {
    justify-content: center;
  }
}
button {
  margin-left: 0.5rem;
}
.inputContainer {
  display: flex;
  justify-content: end;
  input {
    width: 200px;
    max-width: 25vw;
    margin-left: 0.25rem;
    border: solid 1px orangered;
    border-radius: 0.25rem;
  }
}

</style>