<script setup>
import {ref} from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "Search",
  },
  hint: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  searchFunc: {
    type: Function,
  }
});

const queryString = ref('');
const loading = ref(false);

async function search() {
  loading.value = true;
  await props.searchFunc(queryString.value);
  loading.value = false;
}

</script>

<template>
  <form>
    <q-input :disable="disabled" filled bg-color="white" v-model="queryString" :label="label">
      <template #append>
        <q-btn @click="search" type="submit" :loading="loading" flat round color="primary" icon="search">
          <template #loading>
            <q-spinner-facebook/>
          </template>
        </q-btn>
      </template>
    </q-input>
  </form>
</template>

<style scoped>

</style>
