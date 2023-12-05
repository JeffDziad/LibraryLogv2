<script setup>
import {useAuthUser} from "src/store/authUser";

const user = useAuthUser();
</script>

<template>
  <div v-if="!user.user" class="absolute-center">
    <span>Please sign in to view your library...</span>
  </div>
  <div v-else class="container flex flex-center">
    {{user.user}}
  </div>
</template>

<style scoped>
.absolute-center {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(50%, 50%);
}
</style>
