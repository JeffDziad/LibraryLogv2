<script setup>
import BasicTabsWithContent from "components/Basics/BasicTabsWithContent.vue";
import BookForm from "components/forms/BookForm.vue";
import GoogleBookForm from "components/forms/GoogleBookForm.vue";
import {ref} from "vue";
import Book from "src/models/Book";

const props = defineProps({
  allCategories: {
    type: Array,
  },
  saveItem: {
    type: Function,
  }
});

let tabs = ref(null);
let book = ref(new Book());

function saveBook() {
  props.saveItem(book.value);
}

function useBookFromAPI(b) {
  let nb = new Book();
  nb.title = b.volumeInfo.title;
  nb.subtitle = b.volumeInfo.subtitle;
  //! Sometimes displays the isbn-10 instead of isbn-13. Look at all inside IndustryIdentifiers and use the largest number.
  //! Or use the number with 13 char's.
  nb.isbn = b.volumeInfo.industryIdentifiers[0].identifier;
  nb.authors = b.volumeInfo.authors;
  nb.thumbnail = (b.volumeInfo.imageLinks.smallThumbnail) ? b.volumeInfo.imageLinks.smallThumbnail : null;
  nb.pageCount = b.volumeInfo.pageCount;
  nb.publisher = b.volumeInfo.publisher;
  nb.description = b.volumeInfo.description;
  nb.categories = b.volumeInfo.categories;
  //! Sometimes doesn't work...
  nb.publishedDate = b.volumeInfo.publishedDate.replaceAll("-", "/");
  book.value = nb;
  tabs.value.setTab("Manual");
}

function reset() {
  book.value = new Book();
}

defineExpose({
  reset,
});
</script>

<template>
  <BasicTabsWithContent ref="tabs" :tab-names="['Manual', 'Search']">
    <template #Manual-tab>
      <span><q-icon name="edit_note" size="md"/>Manual</span>
    </template>
    <template #Search-tab>
      <span><q-icon name="manage_search" size="md"/>Search</span>
    </template>

    <template #Manual-content>
      <BookForm :book="book" :all-categories="allCategories" @valid-submit="saveBook"/>
    </template>
    <template #Search-content>
      <GoogleBookForm :use-book="useBookFromAPI"/>
    </template>
  </BasicTabsWithContent>
</template>

<style scoped>

</style>
