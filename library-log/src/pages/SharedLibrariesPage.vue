<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
import {useAuthUser} from "src/store/authUser";
import LoginRequiredAlert from "components/alerts/LoginRequiredAlert.vue";
import LibraryView from "components/library/LibraryView.vue";
import CreateLibraryModal from "components/modals/CreateLibraryModal.vue";
import {computed, ref, watch} from "vue";
import { useUserData } from "src/store/userData";
import Library from "src/models/Library";

const user = useAuthUser();
const userData = useUserData();
const splitterModel = ref(20);
const selectedLibrary = ref("");
const libraryPanel = ref('library');
const drawer = ref(false);

const currentLibrary = computed(() => {
  if(userData.sharedLibraries) {
    let found = userData.sharedLibraries.find((lib) => lib.docId === selectedLibrary.value);
    if(found) return found;
  }
  return null;
});

watch(selectedLibrary, () => {
  // Changed library selection
});
</script>

<template>
  <LoginRequiredAlert :user="user.user"/>
  <div v-if="user.user" class="container-md flex flex-center">
    <div class="window-width">

      <q-toolbar class="bg-white">
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title class="">
          <span class="text-h5">Shared Libraries</span>

          <span v-if="currentLibrary" class="text-primary text-bold text-h5"><span class="text-h5 text-black"> > </span>{{currentLibrary.name}}</span>
        </q-toolbar-title>

      </q-toolbar>

      <q-drawer v-model="drawer" :width="200" :breakpoint="500" overlay bordered>
        <q-tabs vertical v-model="selectedLibrary">
          <q-tab @click="drawer = false" v-for="l in userData.sharedLibraries" :name="l.docId" :label="l.name"></q-tab>
          <div class="flex justify-center">
            <CreateLibraryModal>
              <template #button="{showModal}">
                <q-btn @click="showModal" class="q-py-md" color="primary" square flat style="width: 100%; height: 100%;"><q-icon name="add"/><span class="mobile-hide">Create Library</span></q-btn>
              </template>
            </CreateLibraryModal>
          </div>
        </q-tabs>
      </q-drawer>

      <!--        <q-page-container class="q-ma-none q-pa-none">-->
      <div class="column">
        <div class="col">
          <q-tab-panels v-model="libraryPanel" style="border-bottom-right-radius: 25px; border-bottom-left-radius: 25px;">
            <q-tab-panel name="library">
              <LibraryView v-if="currentLibrary" :library="currentLibrary"/>
              <div v-else>
                Please select a library to view...
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
      <!--        </q-page-container>-->
    </div>

  </div>
</template>

<style scoped>

</style>
