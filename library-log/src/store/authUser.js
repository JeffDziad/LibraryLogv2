import {defineStore} from "pinia";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {ref} from "vue";

export const useAuthUser = defineStore('authUser', () => {
  const user = ref({});

  function setUser(u) {
    user.value = u;
  }

  return {user};
});
