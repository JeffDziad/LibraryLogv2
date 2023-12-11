<script setup>
import BasicListMaker from "components/Basics/BasicListMaker.vue";
import {computed, inject, onMounted, ref} from "vue";
import BasicToggleQItem from "components/Basics/BasicToggleQItem.vue";

const removeDuplicatesFromArray = inject('removeDuplicatesFromArray');

const props = defineProps({
  appendable: {
    type: Boolean,
    default: true,
  },
  allCategories: {
    type: Array,
    default: [],
  },
  selectedCategories: {
    type: Array,
    default: [],
  }
});

const reduced = computed(() => {
  return removeDuplicatesFromArray(props.allCategories.concat(props.selectedCategories));
});

const categoriesString = computed(() => {
  return props.selectedCategories.join(', ');
});

function addCategory(cat) {
  props.selectedCategories.push(cat);
}

function clearSelected() {
  props.selectedCategories.splice(0, props.selectedCategories.length);
}

</script>

<template>
<BasicListMaker title="Categories" icon="category" :list="reduced" item-label="Category" @new-item="addCategory" :caption="categoriesString" :appendable="appendable">
  <template #item="{ item }">
    <BasicToggleQItem :name="item" :selected="selectedCategories"></BasicToggleQItem>
  </template>
  <template #appendItem>
    <q-item clickable class="flex justify-center bg-grey-3" @click="clearSelected">
      <q-icon name="clear_all" size="md"/>
      <span class="text-subtitle1">&nbsp;Clear All</span>
    </q-item>
  </template>
</BasicListMaker>
</template>

<style scoped>

</style>
