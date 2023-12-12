<script setup>
  const props = defineProps({
    icon: {
      type: String,
      default: "disabled_by_default"
    },
    label: {
      type: String,
      default: "Label"
    }
  });
</script>

<template>
<div>
  <span id="label" class="q-pb-sm q-px-sm">
    <q-icon class="q-mr-sm" size="md" :name="icon"/><span class="text-subtitle2" style="vertical-align: sub;">{{label}}</span>
  </span>
  <div class="q-pl-md">
    <slot/>
  </div>
</div>
</template>

<style scoped>
#label {
  border-bottom: solid rgba(0, 0, 0, 0.5) 2px;
}
</style>
