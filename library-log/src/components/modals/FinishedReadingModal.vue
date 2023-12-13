<script setup>
import {onMounted, ref, watch} from "vue";
import BasicModal from "components/Basics/BasicModal.vue";

const emit = defineEmits(['finished']);
const modal = ref(null);
const form = ref(null);
const pagesRead = ref(0);

const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 9999,
  }
})

function showModal() {
  modal.value.show();
}

function hideModal() {
  modal.value.hide();
}

function validate() {
  form.value.submit();
}

function finished() {
  emit('finished', pagesRead.value);
  hideModal();
}

defineExpose({
  showModal,
  hideModal
});

onMounted(() => {
  pagesRead.value = props.min;
});
</script>

<template>
  <slot name="button" :showModal="showModal"/>
  <BasicModal ref="modal">
    <template #header>
      <span class="text-subtitle1">Finished Reading?</span>
    </template>
    <template #content>
      <span>Tell us what page you finished on!</span>
      <q-form ref="form" @submit="finished" class="q-mt-md">
        <q-input type="number" filled :min="min" :max="max" v-model="pagesRead" label="Pages Read" :rules="[val => val >= min && val <= max] || `Must be between ${min} and ${max}!`"></q-input>
        <span class="text-negative">Must be between {{min}} and {{max}}!</span>
      </q-form>
    </template>
    <template #actions>
      <q-card-actions>
        <q-space/>
        <q-btn flat @click="validate" color="positive">Finish</q-btn>
      </q-card-actions>
    </template>
  </BasicModal>
</template>

<style scoped>

</style>
