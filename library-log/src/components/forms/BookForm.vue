<script setup>
import Book from "src/models/Book";
import BasicCategoryPicker from "components/Basics/BasicCategoryPicker.vue";
import BasicAuthorPicker from "components/Basics/BasicAuthorPicker.vue";
import DatePickerInput from "components/Basics/DatePickerInput.vue";
import {ref} from "vue";

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
  allCategories: {
    type: Array,
    default: [],
  },
});
const emit = defineEmits(['validSubmit'])

const loading = ref(false);

function submit() {
  // Validate

  // Submit after validation
  emit('validSubmit');

  // reset validation
  reset();
}

function reset() {
  // validation reset
}
</script>

<template>
  <q-form @submit="submit" @reset="reset">
    <q-input class="q-mb-md" v-model="book.title" filled label="Title" hint="Required!" :rules="[val => !!val || 'A title is required!']"/>
    <q-input dense class="q-mb-md" v-model="book.subtitle" filled label="Subtitle"/>
    <BasicAuthorPicker class="q-mb-md" :authors="book.authors"></BasicAuthorPicker>
    <q-input class="q-mb-md" v-model="book.publisher" filled label="Publisher"/>
    <DatePickerInput :date="book.publishedDate" :update-date="function(date) { book.publishedDate = date;}"></DatePickerInput>
    <q-input class="q-mb-md" label="Description" v-model="book.description" filled type="textarea"/>
    <q-input class="q-mb-md" v-model="book.isbn" filled label="ISBN" mask="#############" hint="Required!" :rules="[val => val.length === 13 & !!val || 'Please enter a valid ISBN!']"/>
    <q-input class="q-mb-md" label="Pages" v-model.number="book.pageCount" type="number" filled/>
    <q-input class="q-mb-md" label="Thumbnail URL" v-model="book.thumbnail" filled type="url"/>
    <BasicCategoryPicker class="q-mb-md" :all-categories="allCategories" :selected-categories="book.categories"></BasicCategoryPicker>
    <q-btn type="submit" color="positive" class="float-right q-mb-sm">Save</q-btn>
  </q-form>
</template>

<style scoped>

</style>
