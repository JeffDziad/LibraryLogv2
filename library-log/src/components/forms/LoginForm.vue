<script setup>
import {ref} from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = getAuth();
const email = ref("");
const password = ref("");
const form = ref(null);

function login() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      router.push("dashboard");
    })
    .catch((error) => {
      console.error(error.code);
    });
}

const isValidEmail = (email) => {
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  return regex.test(email);
};
</script>

<template>
  <span class="text-subtitle2">Login</span>
  <q-form ref="form" @submit="login" class="q-ma-sm">
    <q-input class="q-mb-sm" outlined v-model="email" type="text" label="Email" :rules="[val => isValidEmail(val) || 'Invalid Email']"/>
    <q-input class="q-mb-sm" outlined v-model="password" type="password" label="Password" :rules="[ val => val.length > 0 || 'Password Required' ]"/>
    <q-btn color="positive" type="submit">Login</q-btn>
  </q-form>
</template>

<style scoped>

</style>
