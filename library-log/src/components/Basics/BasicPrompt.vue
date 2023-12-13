<script setup>
import BasicModal from "components/Basics/BasicModal.vue";
import {inject, ref} from "vue";

const eid = inject('eid');
const modal = ref(null);
const form = ref(null);
const props = defineProps({
  title: {
    type: String,
    default: "Prompt",
  },
  inputLabel: {
    type: String,
    default: "Prompt Value",
  },
  submitBtnTitle: {
    type: String,
    default: "Submit",
  },
  submitFunc: {
    type: Function,
    required: true,
  }
});
const inputValue = ref("");

function showModal() {
  modal.value.show();
}

function hideModal() {
  modal.value.hide();
}

function validate() {
  form.value.submit();
}

function submit() {
  props.submitFunc(inputValue.value);
  hideModal();
}

defineExpose({
  showModal,
  hideModal
});
</script>

<template>
  <slot name="button" :showModal="showModal"/>

  <BasicModal ref="modal">
    <template #header>
      <span class="q-ml-md text-subtitle1">{{title}}</span>
    </template>
    <template #content>
      <q-form @submit="submit" ref="form">
        <q-input v-model="inputValue" :label="inputLabel" hint="Required" filled :rules="[val => !!val || 'Please enter a name.']"/>
      </q-form>
    </template>
    <template #actions>
      <div class="q-pa-md flex justify-between">
        <q-btn @click="hideModal" outline color="negative">Close</q-btn>
        <q-btn @click="validate" outline color="positive">{{submitBtnTitle}}</q-btn>
      </div>
    </template>
  </BasicModal>
</template>

<style scoped>

</style>
