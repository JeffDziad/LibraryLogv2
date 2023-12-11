<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  }
});
</script>

<template>
  <div v-if="!user" class="absolute-center">
    <q-icon style="font-size: 100px;" color="negative" name="error"/>
    <span class="text-grey-8" style="font-size: 1rem;">Please sign in to continue...</span>
  </div>
</template>

<style scoped>
.absolute-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
