<script setup>
import BasicModal from "components/Basics/BasicModal.vue";
import {inject, onMounted, reactive, ref, watch} from "vue";
import {useAuthUser} from "src/store/authUser";
import {useUserData} from "src/store/userData";
import {db} from "boot/firebase";
import {setDoc, collection, doc} from "firebase/firestore";

const showNotif = inject('showNotif');
const user = useAuthUser();
const userData = useUserData();
const modal = ref(null);
const epilepsySafeMode = ref(false);

function showModal() {
  modal.value.show();
}

watch(epilepsySafeMode, async (n, o) => {
  try {
    await setDoc(doc(db, "users", user.user.uid), {epilepsySafeMode: n});
    showNotif('green', 'white', 'Updated User Settings', 'check');
  } catch (e) {
    console.error(e);
    showNotif('red', 'white', 'Failed to Update User Settings', 'error');
  }
});
onMounted(() => {
  if(userData.settings) epilepsySafeMode.value = userData.settings.epilepsySafeMode;
});
</script>

<template>
  <slot name="button" :showModal="showModal">
    <q-btn @click="showModal" round flat color="grey-5" icon="settings" size="sm"></q-btn>
  </slot>

  <BasicModal ref="modal">
    <template #header>
      <q-icon size="lg" name="settings"/><span class="q-ml-md text-subtitle1">Account Settings</span>
    </template>
    <template #content>
      <q-toggle v-model="epilepsySafeMode" label="Epilepsy Safe Mode" color="info"/>
    </template>
    <template #actions>

    </template>
  </BasicModal>
</template>

<style scoped>

</style>
