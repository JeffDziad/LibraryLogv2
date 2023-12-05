<script setup>
import {ref} from "vue";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const auth = getAuth();
const router = useRouter();

const email = ref("");
const password = ref("");

function signup() {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      //? Logged In
      router.push('dashboard');
    })
    .catch((error) => {
      //! Print error
      console.error(error.code, error.message);
    });
}
</script>

<template>
  <q-form @submit.prevent="signup">
    <q-input outlined v-model="email" type="text" label="Email"/>
    <q-input outlined v-model="password" type="password" label="Password"/>
    <q-btn type="submit">Register</q-btn>
  </q-form>
</template>

<style scoped>

</style>
