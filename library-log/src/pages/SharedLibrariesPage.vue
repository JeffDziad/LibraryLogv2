<script setup>
import {useAuthUser} from "src/store/authUser";
import LoginRequiredAlert from "components/alerts/LoginRequiredAlert.vue";

const user = useAuthUser();
</script>

<template>
  <div class="container">
    <LoginRequiredAlert :user="user.user"/>
    <div v-if="user.user">
      <div class="window-width q-pa-lg">
        <span class="text-h4" style="font-variant-caps: small-caps">Shared Libraries</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
