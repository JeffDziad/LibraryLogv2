<script setup>
import { useRouter } from "vue-router";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {initializeNewUser} from "components/helpers/UserHelpers";
const provider = new GoogleAuthProvider();
const auth = getAuth();
const router = useRouter();

function login() {
  signInWithPopup(auth, provider)
    .then((result) => {
      //? returns google access token - allows access to the Google API
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      router.push('/my-libraries');
    })
    .catch((error) => {
      const code = error.code;
      const message = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("Error: ", code, message);
    });
}
</script>

<template>
  <q-form>
    <q-btn color="info" @click="login" style="width: 100%">
      <img class="q-pr-sm" width="25" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="Google Logo"/>
      Login With Google
    </q-btn>
  </q-form>
</template>

<style scoped>

</style>
