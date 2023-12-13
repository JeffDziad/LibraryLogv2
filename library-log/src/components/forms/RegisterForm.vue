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
      //? New User Created - logging in
      router.push('/my-libraries');
    })
    .catch((error) => {
      //! Print error
      console.error(error.code, error.message);
    });
}

const isValidEmail = (email) => {
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  return regex.test(email);
};
</script>

<template>
  <p class="text-subtitle1">Register</p>
  <q-form @submit.prevent="signup">
    <q-input class="q-mb-sm" outlined v-model="email" type="text" label="Email" :rules="[val => isValidEmail(val) || 'Invalid Email']"/>
    <q-input class="q-mb-sm" outlined v-model="password" type="password" label="Password" :rules="[ val => val.length > 0 || 'Password Required' ]"/>
    <q-btn type="submit" color="positive">Register</q-btn>
  </q-form>
</template>

<style scoped>

</style>
