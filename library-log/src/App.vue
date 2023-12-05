<template>
  <router-view />
</template>

<script setup>
import User from "./models/User";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthUser } from "src/store/authUser";
import {provide} from "vue";

function eid() {
  eid.count = eid.count ?? 1;
  return eid.count++;
}

const auth = getAuth();
const authUser = useAuthUser();
onAuthStateChanged(auth, (user) => {
  if(user) {
    authUser.user = new User(user);
  } else {
    authUser.user = null;
  }
});

provide('eid', eid);
</script>

