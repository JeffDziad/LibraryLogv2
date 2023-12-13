<template>
  <q-layout view="lHh Lpr lff">
    <q-header class="bg-dark flex justify-between">
      <q-toolbar class="text-white bg-dark q-py-sm">
        <q-toolbar-title class="text-h4">
          <router-link to="/" class="header-link inline-block">
            <TypingText :show-cursor="!showCursor" class="text-h4" text="Library Log"/>
          </router-link>

        </q-toolbar-title>
        <AccountMenu ref="accountMenu" :user="authUser.user"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view @openAccountMenu="openAccountMenu"/>
    </q-page-container>

    <q-footer class="bg-dark">
      Library Log ©{{year}}
    </q-footer>
  </q-layout>
</template>

<script setup>
import TypingText from "components/Basics/TypingText.vue";
import AccountMenu from "components/AccountMenu.vue";
import { useAuthUser } from "src/store/authUser";
import {computed, onMounted, ref, watch} from "vue";
import { useUserData } from "src/store/userData";

const userData = useUserData();
const authUser = useAuthUser();
const accountMenu = ref(null);
const showCursor = ref(true);

function openAccountMenu() {
  accountMenu.value.openMenu();
}

const year = computed(() => {
  return new Date().getFullYear();
});

watch(() => userData.settings, (n, o) => {
  showCursor.value = userData.settings.epilepsySafeMode;
});
</script>

<style scoped>
.header-link {
  text-decoration: inherit;
  color: inherit;
  cursor: pointer;
}
</style>
