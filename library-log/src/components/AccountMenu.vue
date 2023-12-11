<script setup>
import {computed, ref} from "vue";
import LoginForm from "components/forms/LoginForm.vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import GoogleAuth from "components/GoogleAuth/GoogleAuth.vue";
import SettingsModal from "components/modals/SettingsModal.vue";

const auth = getAuth();
const router = useRouter();
const show = ref(false);

const props = defineProps({
  user: {
    type: Object,
    default: {}
  }
});

function openMenu() {
  show.value = true;
}

function closeMenu() {
  show.value = false;
}

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

defineExpose({openMenu, closeMenu});
</script>

<template>
  <q-btn-dropdown v-model="show" unelevated>
    <template #label>
      <q-avatar>
        <img style="" :src="avatarImg" alt="Account Avatar"/>
      </q-avatar>
    </template>
    <div class="row no-wrap q-pa-md">

      <!--   LOGGED IN   -->
      <div v-if="user" class="column">
        <div class="row">
          <div class="col-6 flex items-end">
            <span class="text-subtitle1 text-weight-medium">Hello,</span>
          </div>
          <div class="col-6 flex justify-end">
            <SettingsModal/>
          </div>
        </div>
        <p> {{user.displayName}}</p>
        <div class="row flex justify-between">
          <div class="col-auto">
            <q-btn @click="router.push('/my-libraries')" round icon="library_books" color="info">
              <q-tooltip class="bg-info text-subtitle2">
                My Libraries
              </q-tooltip>
            </q-btn>
          </div>
          <div class="col-auto q-px-sm">
            <q-btn @click="router.push('/shared-libraries')" round icon="groups" color="accent">
              <q-tooltip class="bg-accent text-subtitle2">
                Shared Libraries
              </q-tooltip>
            </q-btn>
          </div>
          <div class="col-auto">
            <q-btn @click="logout" round icon="logout" color="negative">
              <q-tooltip class="bg-negative text-subtitle2">
                Log Out
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>

      <!--   LOGGED OUT   -->
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
