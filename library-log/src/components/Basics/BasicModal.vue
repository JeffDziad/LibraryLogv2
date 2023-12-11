<script setup>
import {ref} from "vue";

const props = defineProps({
  onShow: {
    type: Function,
  },
  onHide: {
    type: Function,
  },
});

let visible = ref(false);

function show() {
  visible.value = true;
}

function hide() {
  visible.value = false;
}

defineExpose({
  show,
  hide
});

</script>

<template>
  <div>
  <q-dialog v-model="visible" @show="onShow" @hide="onHide">
    <q-card class="modal-container" style="width: 500px; max-width: 80vw;">
      <q-card-section class="row items-center bg-primary text-white">
        <slot name="header"></slot>
        <q-space/>
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator />
      <q-card-section style="max-height: 80vh" class="scroll">
        <slot name="content"></slot>
      </q-card-section>
      <q-separator/>
      <slot name="actions"></slot>
    </q-card>
  </q-dialog>
  </div>
</template>

<style scoped>

</style>
