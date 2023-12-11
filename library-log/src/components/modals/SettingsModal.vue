<script setup>
import BasicModal from "components/Basics/BasicModal.vue";
import {ref} from "vue";

const modal = ref(null);
const settings = ref({
  epilepsySafeMode: false,
});

function showModal() {
  modal.value.show();
}
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
      <q-toggle v-model="settings.epilepsySafeMode" label="Epilepsy Safe Mode" color="info"/>
    </template>
    <template #actions>

    </template>
  </BasicModal>
</template>

<style scoped>

</style>
