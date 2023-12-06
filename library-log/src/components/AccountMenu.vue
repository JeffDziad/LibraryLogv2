<script setup>
import {computed} from "vue";
import LoginForm from "components/forms/LoginForm.vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import GoogleAuth from "components/GoogleAuth/GoogleAuth.vue";

const auth = getAuth();
const router = useRouter();

const props = defineProps({
  user: {
    type: Object,
    default: {}
  }
});

function logout() {
  signOut(auth).then(() => {
    router.push("/");
  }).catch((error) => {
    console.error("Failed!", error);
  });
}

const avatarImg = computed(() => {
  if(props.user?.photoURL) {
    return props.user.photoURL;
  } else return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png";
});
</script>

<template>
  <q-btn-dropdown unelevated>
    <template #label>
      <q-avatar>
        <img style="" :src="avatarImg" alt="Account Avatar"/>
      </q-avatar>
    </template>
    <div class="row no-wrap q-pa-md">

      <div v-if="user" class="column items-center">
        <q-btn @click="router.push('dashboard')" color="info" style="width: 100%;">My Library</q-btn>
        <span>{{user.email}}</span>
        <q-btn style="width: 100%;" color="negative" @click="logout">Sign Out</q-btn>
      </div>

      <div v-show="!user" class="column items-center">
        <div class="row">
          <div class="col-auto">
            <LoginForm/>
            <GoogleAuth class="q-px-sm q-pb-sm"/>
          </div>
        </div>
        <span>Don't have an account? <router-link to="/register">Sign Up!</router-link></span>
      </div>
    </div>
  </q-btn-dropdown>
</template>

<style scoped>

</style>
