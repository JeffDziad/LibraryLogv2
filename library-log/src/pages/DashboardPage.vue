<script setup>
import {useAuthUser} from "src/store/authUser";

const user = useAuthUser();
</script>

<template>
  <div v-if="!user.user" class="absolute-center">
    <q-icon style="font-size: 100px;" color="negative" name="error"/>
    <span class="text-grey-8" style="font-size: 1rem;">Please sign in to view your library...</span>
  </div>
  <div v-else class="container flex flex-center">
    {{user.user}}
  </div>
</template>

<style scoped>
.absolute-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
