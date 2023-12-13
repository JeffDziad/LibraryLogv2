<script setup>
import {computed, ref} from "vue";

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
  },
  bgColor: {
    type: String,
  },
  textColor: {
    type: String,
  },
  focusOutTextColor: {
    type: String,
  }
});

const queryString = ref('');
const loading = ref(false);
const focusColor = ref('primary');
const inputRef = ref(null);

async function search() {
  inputRef.value.blur();
  loading.value = true;
  await props.searchFunc(queryString.value);
  loading.value = false;
}

const standoutStyle = computed(() => {
  return 'bg-' + props.bgColor + ' ' + 'text-' + props.textColor;
});

function focusIn() {
  focusColor.value = props.textColor;
}

function focusOut() {
  focusColor.value = props.focusOutTextColor;
}

</script>

<template>
  <form>
    <q-input ref="inputRef" :disable="disabled" :standout="standoutStyle" color="black" v-model="queryString" :label="label" @focusout="focusOut" @focusin="focusIn">
      <template #append>
        <q-btn @click="search" type="submit" :loading="loading" flat round :color="focusColor" icon="search">
          <template #loading>
            <q-spinner-facebook :color="focusColor"/>
          </template>
        </q-btn>
      </template>
    </q-input>
  </form>
</template>

<style scoped>

</style>
