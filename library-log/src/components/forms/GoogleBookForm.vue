<script setup>
import GoogleBooksApi from "src/api/GoogleBooksApi";
import {computed, ref} from "vue";
import SearchInput from "components/Basics/SearchInput.vue";
import GoogleBookCard from "components/cards/GoogleBookCard.vue";

const api = new GoogleBooksApi();

const props = defineProps({
  useBook: {
    type: Function,
  }
});

const keyword = ref(null);
const foundBooks = ref([]);

const keys = computed(() => {
  return Object.keys(GoogleBooksApi.KEYWORDS);
});

const searchLabel = computed(() => {
  if(keyword.value===null) return 'Please select a keyword...';
  return 'Search by ' + keyword.value;
});

async function search(queryString) {
  // look for books
  foundBooks.value = [];
  let f = await api.getBooks(GoogleBooksApi.KEYWORDS[keyword.value], queryString);
  foundBooks.value = f.items;
}

</script>

<template>
  <q-select class="q-mb-sm" filled v-model="keyword" :options="keys" label="Keyword" />
  <SearchInput :disabled="keyword===null" bg-color="primary" text-color="white" focus-out-text-color="black" :label="searchLabel" :search-func="search"></SearchInput>

  <div v-for="b in foundBooks" class="q-mt-md">
    <GoogleBookCard :book="b" :use-book="useBook"></GoogleBookCard>
  </div>
</template>

<style scoped>

</style>
