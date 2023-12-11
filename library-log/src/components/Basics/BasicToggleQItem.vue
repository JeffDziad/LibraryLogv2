<script setup>
import {computed} from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  selected: {
    type: Array,
    default: [],
  }
});

const isSelected = computed(() => {
  return props.selected.includes(props.name);
});

function select() {
  let exists = props.selected.indexOf(props.name);
  if(exists !== -1) {
    props.selected.splice(exists, 1);
  } else {
    props.selected.push(props.name);
  }
}
</script>

<template>
  <q-item clickable v-ripple :class="{'bg-primary': isSelected, 'text-white': isSelected}" @click="select">
    <q-item-section>
      <span class="text-subtitle1">
        <q-icon v-show="!isSelected" name="add"></q-icon>
        <q-icon v-show="isSelected" name="remove"></q-icon>
        {{name}}
      </span>
      <!--        <q-checkbox :model-value="" :label="item"></q-checkbox>-->
    </q-item-section>
  </q-item>
</template>

<style scoped>

</style>
