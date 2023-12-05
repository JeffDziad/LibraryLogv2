<script setup>
import {ref} from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = getAuth();
const email = ref("");
const password = ref("");

function login() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      router.push("dashboard");
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>

<template>
  <span class="text-subtitle2">Login</span>
  <q-form @submit.prevent="login" class="q-ma-sm">
    <q-input class="q-mb-sm" outlined v-model="email" type="text" label="Email"/>
    <q-input class="q-mb-sm" outlined v-model="password" type="password" label="Password"/>
    <q-btn color="positive" type="submit">Login</q-btn>
  </q-form>
</template>

<style scoped>

</style>
