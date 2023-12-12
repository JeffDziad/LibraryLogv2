<script setup>
const props = defineProps({
  showModal: {
    type: Function,
  }
});
</script>

<template>
  <q-btn @click="showModal" size="xl" flat color="dark" icon="edit" style="width: 100%; height: 50%;">
    <slot></slot>
  </q-btn>
</template>

<style scoped>

</style>
