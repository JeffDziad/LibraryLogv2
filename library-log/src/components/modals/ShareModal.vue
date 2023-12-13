<script setup>
import BasicModal from "components/Basics/BasicModal.vue";
import {inject, onMounted, ref} from "vue";
import BasicListMaker from "components/Basics/BasicListMaker.vue";
import {db} from "boot/firebase";
import {collection, addDoc, query, where, onSnapshot, deleteDoc, doc, updateDoc} from "firebase/firestore";
import SharedUser from "src/models/SharedUser";

const showNotif = inject('showNotif');
const modal = ref(null);
const props = defineProps({
  libraryUid: {
    type: String,
    required: true,
  },
  sharedWith: {
    type: Array,
    required: true,
  }
});
const form = ref(null);
const sharedUsers = ref([]);
const email = ref("");

function showModal() {
  modal.value.show();
}

function hideModal() {
  modal.value.hide();
}

function validate() {
  form.value.submit();
}

async function addUser() {
  try {
    if(props.sharedWith.find((u) => u.email === email.value)) {
      showNotif('orange', 'white', 'User has already been added!', 'warning');
    } else {
      await updateDoc(doc(db, "libraries", props.libraryUid), {
        "sharedWith": [...props.sharedWith, email.value]
      });
      showNotif('green', 'white', 'Added User', 'check');
      email.value = "";
      form.value.reset();
    }

  } catch (e) {
    console.error(e);
    showNotif('red', 'white', 'Failed to Add User', 'error');
  }
}

async function removeUser(email) {
  try {
    let index = props.sharedWith.indexOf(email);
    if (index !== -1) {
      props.sharedWith.splice(index, 1);
    }
    await updateDoc(doc(db, "libraries", props.libraryUid), {
      "sharedWith": props.sharedWith
    });
    showNotif('green', 'white', 'Removed User', 'check');
  } catch (e) {
    console.error(e);
    showNotif('red', 'white', 'Failed to Remove User', 'error');
  }
}

const isValidEmail = (email) => {
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  return regex.test(email);
};

defineExpose({
  showModal,
  hideModal
});
</script>

<template>
  <slot name="button"/>
  <BasicModal ref="modal">
    <template #header>
      <div class="text-h6">
        <q-icon name="share"/>
        Share Library
      </div>
    </template>
    <template #content>
      <span class="text-subtitle2">Add User's by their email. They'll be able to view your library but not edit.</span>
      <div class="q-my-md">
        <span v-if="sharedWith.length <= 0" class="text-negative">No Shared Users...</span>
        <p v-for="u in sharedWith">{{u}}<span><q-btn @click="removeUser(u)" flat round color="negative" icon="remove" class="q-ml-sm"></q-btn></span></p>
      </div>
      <q-form ref="form" @submit="addUser">
        <q-input class="q-mb-sm" outlined v-model="email" type="text" label="User's Email" :rules="[val => isValidEmail(val) || 'Invalid Email']">
          <template #append>
            <q-btn @click="validate" icon="add" round flat color="primary"></q-btn>
          </template>
        </q-input>
      </q-form>
    </template>
    <template #actions>

    </template>
  </BasicModal>
</template>

<style scoped>

</style>
