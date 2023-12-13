<script setup>
import {onMounted, ref} from "vue";
import BookCard from "components/cards/BookCard.vue";

const emit = defineEmits(['update']);
const props = defineProps({
  items: {
    type: Array,
  },
  libraryUid: {
    type: String,
    required: true,
  },
  owned: {
    type: Boolean,
    default: true,
  }
});

const viewOptions = ref([
  {label: "Grid", value: "grid", slot: "grid"},
  {label: "List", value: "list", slot: "list"}
]);
const viewFormat = ref("list");
const lockViewFormat = ref(false);

function onResize(e) {
  if(innerWidth <= 600) {
    viewFormat.value = "grid";
    lockViewFormat.value = true;
  }
  else {
    viewFormat.value = "list";
    lockViewFormat.value = false;
  }
}

window.addEventListener('resize', onResize);

onMounted(() => {
  onResize();
});
</script>

<template>
<div class="q-pa-md faded-wight-background rounded-borders">
  <div class="row q-mb-md">
    <div class="col-6 flex justify-start">
      <span class="bg-primary text-white q-pa-sm text-subtitle2 rounded-borders">{{items.length}} Result(s)</span>
    </div>
    <div class="col-6 flex justify-end">
      <q-btn-toggle :disable="lockViewFormat" v-model="viewFormat" color="white" text-color="black" toggle-color="primary" :options="viewOptions">
        <template #grid>
          <q-icon name="grid_view"></q-icon>
        </template>
        <template #list>
          <q-icon name="list"></q-icon>
        </template>
      </q-btn-toggle>
    </div>
  </div>
  <div class="row" :class="{'flex': viewFormat==='grid', 'justify-around': viewFormat==='grid'}">
    <div :class="{'col-12': viewFormat==='list'}" v-for="(i) in items">
      <BookCard :library-uid="libraryUid" :view-format="viewFormat" :item="i" :owned="owned"></BookCard>
    </div>
    <div v-if="items.length <= 0">
      <q-icon name="warning" size="xl"></q-icon>
      <span class="text-h6" style="vertical-align: sub;">{{(owned)?'Your':'This'}} library is empty...</span>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
