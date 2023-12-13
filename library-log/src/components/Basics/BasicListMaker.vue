<script setup>
import {ref, inject, computed} from "vue";
const eid = inject('eid');

const newListItem = ref("");

const props = defineProps({
  title: {
    type: String,
    default: "List Maker",
  },
  appendable: {
    type: Boolean,
    default: true,
  },
  caption: {
    type: String,
    default: "",
  },
  itemLabel: {
    type: String,
    default: "Custom",
  },
  icon: {
    type: String,
  },
  list: {
    type: Array,
    default: [],
  }
});

const emit = defineEmits(['newItem']);

const formattedItemLabel = computed(() => {
  return `'${props.itemLabel}'`;
});

function addListItem() {
  if(newListItem.value) {
    emit('newItem', newListItem.value);
    newListItem.value = "";
  }
}
</script>

<template>
  <q-expansion-item class="bg-primary" dark :icon="icon" :label="title" :caption="caption" expand-separator>
    <q-card>
      <q-card-section class="q-pa-none">
        <q-list bordered separator id="ListArea">
          <q-item v-if="list.length <= 0">
            <q-item-section>
              <span class="text-subtitle2">No {{title}}...</span>
            </q-item-section>
          </q-item>
          <template v-for="item in list" :key="item + '-' + eid()">
            <slot name="item" :item="item">
              <q-item>
                <q-item-section>
                  <span>{{item}}</span>
                </q-item-section>
              </q-item>
            </slot>
          </template>
          <slot name="appendItem"></slot>
        </q-list>
      </q-card-section>

      <q-card-actions v-show="appendable" class="q-ma-none bg-primary">
        <q-input @keydown.enter.prevent="addListItem" class="full-width" outlined dense bg-color="white" v-model="newListItem" :label="formattedItemLabel">
          <template #append>
            <q-btn @click="addListItem" flat color="primary" icon="add"/>
          </template>
        </q-input>
      </q-card-actions>

    </q-card>
  </q-expansion-item>
</template>

<style scoped>
#ListArea {
  overflow: scroll;
  max-height: 250px;
}
</style>
