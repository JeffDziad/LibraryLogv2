<script setup>
import {ref} from "vue";

const props = defineProps({
  date: {
    type: String,
    default: ""
  },
  updateDate: {
    type: Function,
    required: true,
  },
});

const dateRef = ref(props.date);

</script>

<template>
  <q-input filled v-model="dateRef" mask="date" :rules="['date']">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="dateRef" @update:model-value="updateDate">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<style scoped>

</style>
