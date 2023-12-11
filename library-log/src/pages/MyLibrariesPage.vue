<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
import {useAuthUser} from "src/store/authUser";
import {computed, ref, watch} from "vue";
import LoginRequiredAlert from "components/alerts/LoginRequiredAlert.vue";
import CreateLibraryModal from "components/modals/CreateLibraryModal.vue";
import LibraryView from "components/library/LibraryView.vue";
import { useUserData } from "src/store/userData";
import Library from "src/models/Library";

const user = useAuthUser();
const userData = useUserData();
const splitterModel = ref(20);
const selectedLibrary = ref("");
const libraryPanel = ref('library');

const currentLibrary = computed(() => {
  if(userData.myLibraries) {
    let found = userData.myLibraries.find((lib) => lib.docId === selectedLibrary.value);
    if(found) return found;
  }
  return Library();
});

watch(selectedLibrary, () => {
  // Changed library selection
});
</script>

<template>
  <LoginRequiredAlert :user="user.user"/>
  <div v-if="user.user" class="container-md flex flex-center">
    {{user.user}}
    <br>
    {{userData.myLibraries}}
    <div class="window-width q-pa-lg">
      <span class="text-h4" style="font-variant-caps: small-caps">My Libraries</span>
      <hr>
    </div>
    <div class="window-width">
      <q-splitter v-model="splitterModel">
        <template #before>
          <q-tabs vertical v-model="selectedLibrary">
            <q-tab v-for="l in userData.myLibraries" :name="l.docId" :label="l.name"></q-tab>
            <div class="flex justify-center">
              <CreateLibraryModal>
                <template #button="{showModal}">
                  <q-btn @click="showModal" class="q-py-md" color="primary" square flat style="width: 100%; height: 100%;"><q-icon name="add"/><span class="mobile-hide">Create Library</span></q-btn>
                </template>
              </CreateLibraryModal>
            </div>
          </q-tabs>
        </template>
        <template #after>
          <q-tab-panels v-model="libraryPanel">
            <q-tab-panel name="library">
              <LibraryView :library="currentLibrary"/>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>

  </div>
</template>

<style scoped>

</style>
