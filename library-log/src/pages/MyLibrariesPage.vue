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
const drawer = ref(false);

const currentLibrary = computed(() => {
  if(userData.myLibraries) {
    let found = userData.myLibraries.find((lib) => lib.docId === selectedLibrary.value);
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
<!--      <q-splitter v-model="splitterModel">-->
<!--        <template #before>-->
<!--          <q-tabs vertical v-model="selectedLibrary">-->
<!--            <q-tab v-for="l in userData.myLibraries" :name="l.docId" :label="l.name"></q-tab>-->
<!--            <div class="flex justify-center">-->
<!--              <CreateLibraryModal>-->
<!--                <template #button="{showModal}">-->
<!--                  <q-btn @click="showModal" class="q-py-md" color="primary" square flat style="width: 100%; height: 100%;"><q-icon name="add"/><span class="mobile-hide">Create Library</span></q-btn>-->
<!--                </template>-->
<!--              </CreateLibraryModal>-->
<!--            </div>-->
<!--          </q-tabs>-->
<!--        </template>-->
<!--        <template #after>-->
<!--          <q-tab-panels v-model="libraryPanel">-->
<!--            <q-tab-panel name="library">-->
<!--              <LibraryView v-if="currentLibrary" :library="currentLibrary"/>-->
<!--              <div v-else>-->
<!--                Please select a library to view...-->
<!--              </div>-->
<!--            </q-tab-panel>-->
<!--          </q-tab-panels>-->
<!--        </template>-->
<!--      </q-splitter>-->

        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title class="text-h5">My Libraries</q-toolbar-title>
        </q-toolbar>

        <q-drawer v-model="drawer" :width="200" :breakpoint="500" overlay bordered>
          <q-tabs vertical v-model="selectedLibrary">
            <q-tab @click="drawer = false" v-for="l in userData.myLibraries" :name="l.docId" :label="l.name"></q-tab>
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
          <div class="column" >
            <div class="col">
              <q-tab-panels v-model="libraryPanel">
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
