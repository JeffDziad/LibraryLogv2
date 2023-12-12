<script setup>
import {ref} from "vue";

const visible = ref(false);

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
  <q-dialog
    v-model="visible"
    persistent
    maximized
  >
    <q-card>
      <q-bar class="q-py-lg bg-primary text-white">
        <slot name="header"/>
        <q-space />
        <q-btn round size="md" flat icon="close" v-close-popup></q-btn>
      </q-bar>
      <q-card-section class="q-pt-none">
        <slot name="content"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
