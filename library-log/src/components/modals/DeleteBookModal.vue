<script setup>
import BasicModal from "components/Basics/BasicModal.vue";
import {inject, ref} from "vue";
import BasicDeleteButton from "components/Basics/BasicDeleteButton.vue";
import { db } from "boot/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const showNotif = inject('showNotif');

const props = defineProps({
  title:  {
    type: String,
    required: true,
  },
  bookUid: {
    type: String,
    required: true,
  },
  libraryUid: {
    type: String,
    required: true,
  }
});

const modal = ref(null);

function showModal() {
  modal.value.show();
}

async function proceedWithDelete() {
  try {
    const itemRef = doc(db, "libraries", props.libraryUid, "items", props.bookUid);
    await deleteDoc(itemRef);
    showNotif('green', 'white', 'Deleted Book', 'check');
  } catch(e) {
    showNotif('red', 'white', 'Failed to Delete Book', 'error');
  }
}

defineExpose({
  showModal,
});

</script>

<template>
  <slot name="button" :showModal="showModal">
    <BasicDeleteButton :show-modal="showModal"/>
  </slot>

  <BasicModal ref="modal">
    <template #header>
      <div class="text-h6">
        <q-icon name="delete"/>
        Delete Book
      </div>
    </template>
    <template #content>
      <p class="text-subtitle1">Are you sure you would like to delete <span class="text-bold text-italic">"{{title}}"</span> from your library?</p>
    </template>
    <template #actions>
      <q-card-actions>
        <q-btn outline flat color="positive" v-close-popup>Cancel</q-btn>
        <q-space/>
        <q-btn outline flat color="negative" @click="proceedWithDelete" v-close-popup>Delete</q-btn>
      </q-card-actions>
    </template>
  </BasicModal>
</template>

<style scoped>

</style>
