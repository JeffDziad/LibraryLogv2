<script setup>
import {inject, onMounted, ref} from "vue";
const eid = inject('eid');

const props = defineProps({
  tabNames: {
    type: Array,
    required: true
  },
  alignment: {
    type: String,
    default: "justify",
  }
});

const tab = ref(null);

function setTab(tabName) {
  tab.value = tabName;
}

onMounted(() => {
  tab.value = props.tabNames[0];
});

defineExpose({
  setTab,
});
</script>

<template>
  <q-tabs
    v-model="tab"
    dense
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    :align="alignment"
    :breakpoint="0"
    narrow-indicator
  >
    <q-tab v-for="name in tabNames" :name="name" :key="name + '-tab'+ eid()">
      <slot :name="name + '-tab'">
        <span>{{name}}</span>
      </slot>
    </q-tab>
  </q-tabs>

  <q-separator />

  <q-tab-panels v-model="tab" animated>
    <template v-for="name in tabNames" :key="name + 'content' + eid()">
      <q-tab-panel :name="name">
        <slot :name="name + '-content'"></slot>
      </q-tab-panel>
    </template>
  </q-tab-panels>
</template>

<style scoped>

</style>
