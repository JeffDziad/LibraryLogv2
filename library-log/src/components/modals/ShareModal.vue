<script setup>
import BasicModal from "components/Basics/BasicModal.vue";
import {onMounted, ref} from "vue";
import BasicListMaker from "components/Basics/BasicListMaker.vue";
import {db} from "boot/firebase";
import {collection, addDoc, query, where, onSnapshot} from "firebase/firestore";
import SharedUser from "src/models/SharedUser";

const modal = ref(null);

const props = defineProps({
  libraryUid: {
    type: String,
    required: true,
  }
});
const sharedUsers = ref([]);

function showModal() {
  modal.value.show();
}

function hideModal() {
  modal.value.hide();
}

defineExpose({
  showModal,
  hideModal
});

onMounted(() => {
  // const sharedWithRef = collection(db, "libraries", props.libraryUid, "sharedWith");
  // const su = onSnapshot(sharedWithRef, (snapshot) => {
  //   const users = [];
  //   snapshot.forEach((doc) => {
  //     users.push(SharedUser(doc.data(), doc.id));
  //   });
  //   sharedUsers.myLibraries = users;
  // });
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
      <BasicListMaker title="Shared Users" icon="groups" :list="[]"/>
    </template>
    <template #actions>

    </template>
  </BasicModal>
</template>

<style scoped>

</style>
