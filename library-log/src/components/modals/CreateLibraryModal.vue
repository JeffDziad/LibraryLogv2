<script setup>
import {inject, ref} from "vue";
import BasicModal from "components/Basics/BasicModal.vue";
import Library from "src/models/Library";
import { db } from "boot/firebase";
import {collection, addDoc, updateDoc, doc} from "firebase/firestore";
import {useAuthUser} from "src/store/authUser";

const showNotif = inject('showNotif');
const userAuth = useAuthUser();
const modal = ref(null);
const form = ref(null);
const newLibrary = ref(Library());

function showModal() {
  modal.value.show();
}

function hideModal() {
  modal.value.hide();
}

function create() {
  form.value.submit();
}

async function validated() {
  newLibrary.value.ownerUid = userAuth.user.uid;
  try {
    await addDoc(collection(db, "libraries"), newLibrary.value);
    showNotif('green', 'white', "Created Library", 'check');
  } catch (e) {
    console.error(e);
    showNotif('red', 'white', "Library Creation Failed", 'error');
  }
  newLibrary.value = Library();
  hideModal();
}
</script>

<template>
  <slot name="button" :showModal="showModal"/>
  <BasicModal ref="modal">
    <template #header>
      <q-icon size="lg" name="add"/><span class="q-ml-md text-subtitle1">Create Library</span>
    </template>
    <template #content>
      <q-form @submit="validated" ref="form">
        <q-input v-model="newLibrary.name" label="Library Name" hint="Required" filled :rules="[val => !!val || 'Please enter a name.']"/>
      </q-form>
    </template>
    <template #actions>
      <div class="q-pa-md flex justify-between">
        <q-btn @click="hideModal" outline color="negative">Close</q-btn>
        <q-btn @click="create" outline color="positive">Create</q-btn>
      </div>
    </template>
  </BasicModal>
</template>

<style scoped>

</style>
