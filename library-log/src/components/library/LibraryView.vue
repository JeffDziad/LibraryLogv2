<script setup>
import LibraryList from "components/library/LibraryList.vue";

const props = defineProps({
  library: {
    default: {},
  }
});
</script>

<template>
  <LibraryList :items="library.items"/>
</template>

<style scoped>

</style>
