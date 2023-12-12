<script setup>
import LibraryList from "components/library/LibraryList.vue";
import SearchInput from "components/Basics/SearchInput.vue";
import AddItemModal from "components/modals/AddItemModal.vue";
import { db } from "boot/firebase";
import {doc, deleteDoc, setDoc, addDoc, collection, query, onSnapshot} from "firebase/firestore";
import {inject, onMounted, ref, watch} from "vue";
import Book from "src/models/Book";

const dupe = inject('dupe');
const props = defineProps({
  library: {
    default: {},
  }
});

const items = ref([]);

// Handle Manipulating books here CRUD ops
async function deleteLibrary() {
  await deleteDoc(doc(db, "libraries", props.library.docId));
}

async function createBook(book) {
  await addDoc(collection(db, "libraries", props.library.docId, "items"), dupe(book));
}

async function updateBook() {

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
    <div class="col-auto q-pa-md">
      <q-btn round color="primary" icon="more_vert">
        <q-menu anchor="bottom left" self="top left">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="deleteLibrary">
              <q-item-section>
                <span><q-icon color="negative" name="delete" size="md"/> <span class="text-subtitle2">Delete</span></span>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <span><q-icon color="black" name="edit" size="md"/> <span class="text-subtitle2">Rename</span></span>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <span><q-icon color="black" name="share" size="md"/> <span class="text-subtitle2">Share</span></span>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <div class="col">
      <SearchInput/>
    </div>
    <div class="col-auto q-pa-md">
      <AddItemModal :save-item="createBook"/>
    </div>
  </div>
  <LibraryList :items="items"/>
</template>

<style scoped>

</style>
