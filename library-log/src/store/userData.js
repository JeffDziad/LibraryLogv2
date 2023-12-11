import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserData = defineStore('authUser', () => {
  const myLibraries = ref([]);
  const sharedLibraries = ref([]);

  // Use getters to filter data. myLibraries and sharedLibraries should be LibraryCollection's, so put as much code in there

  return {myLibraries, sharedLibraries};
});
