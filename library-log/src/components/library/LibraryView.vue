<script setup>
import LibraryList from "components/library/LibraryList.vue";
import SearchInput from "components/Basics/SearchInput.vue";
import AddItemModal from "components/modals/AddItemModal.vue";
import { db } from "boot/firebase";
import {doc, updateDoc, deleteDoc, setDoc, addDoc, collection, query, onSnapshot} from "firebase/firestore";
import {computed, inject, onMounted, ref, watch} from "vue";
import Book from "src/models/Book";
import BasicPrompt from "components/Basics/BasicPrompt.vue";
import ShareModal from "components/modals/ShareModal.vue";

const showNotif = inject('showNotif');
const dupe = inject('dupe');
const props = defineProps({
  library: {
    default: {},
  },
  owned: {
    type: Boolean,
    default: true,
  }
});
const renamePrompt = ref(null);
const shareModal = ref(null);
const items = ref([]);
const searchString = ref('');

// Handle Manipulating books here CRUD ops
async function deleteLibrary() {
  try {
    await deleteDoc(doc(db, "libraries", props.library.docId));
    showNotif('green', 'white', "Deleted Library", 'check');
  } catch (e) {
    showNotif('red', 'white', "Library Deletion Failed", 'error');
  }
}

async function renameLibrary(name) {
  try {
    await updateDoc(doc(db, "libraries", props.library.docId), {
      name: name,
    });
    showNotif('green', 'white', "Updated Library Name", 'check');
  } catch (e) {
    showNotif('red', 'white', "Library Rename Failed", 'error');
  }

}

async function createBook(book) {
  try {
    await addDoc(collection(db, "libraries", props.library.docId, "items"), dupe(book));
    showNotif('green', 'white', "Added Book", 'check');
  } catch (e) {
    showNotif('red', 'white', "Failed to Add Book", 'error');
  }
}

const filtered = computed(() => {
  return items.value.filter((i) => i.title.toUpperCase().includes(searchString.value.toUpperCase()));
});

function search(string) {
  searchString.value = string;
}

function getItems() {
  const docRef = doc(db, 'libraries', props.library.docId);
  const q = query(collection(docRef, "items"));
  const itemList = onSnapshot(q, (snapshot) => {
    const i = [];
    snapshot.forEach((doc) => {
      //! should make into book objects
      i.push(Book(doc.data(), doc.id));
    });
    items.value = i;
  });
}

watch(() => props.library, (n, o) => {
  getItems();
});

onMounted(() => {
  getItems();
});
</script>

<template>
  <div class="row flex items-center">
    <div v-if="owned" class="col-auto q-pa-md">
      <q-btn round color="primary" icon="more_vert">
        <q-menu anchor="bottom left" self="top left">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="deleteLibrary">
              <q-item-section>
                <span><q-icon color="negative" name="delete" size="md"/> <span class="text-subtitle2">Delete</span></span>
              </q-item-section>
            </q-item>
            <q-item @click="renamePrompt.showModal" clickable v-close-popup>
              <q-item-section>
                <span><q-icon color="black" name="edit" size="md"/> <span class="text-subtitle2">Rename</span></span>
              </q-item-section>
            </q-item>
            <q-item @click="shareModal.showModal" clickable v-close-popup>
              <q-item-section>
                <span><q-icon color="black" name="share" size="md"/> <span class="text-subtitle2">Share</span></span>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <div class="col">
      <SearchInput bg-color="primary" text-color="white" focus-out-text-color="primary" :search-func="search"/>
    </div>
    <div v-if="owned" class="col-auto q-pa-md">
      <AddItemModal :save-item="createBook"/>
    </div>
  </div>
  <LibraryList :library-uid="library.docId" :items="filtered" :owned="owned"/>
  <BasicPrompt v-if="owned" ref="renamePrompt" :submit-func="renameLibrary" submit-btn-title="Rename" title="Rename Library" input-label="Library Name"></BasicPrompt>
  <ShareModal v-if="owned" ref="shareModal" :library-uid="library.docId" :shared-with="library.sharedWith"/>
</template>

<style scoped>

</style>
