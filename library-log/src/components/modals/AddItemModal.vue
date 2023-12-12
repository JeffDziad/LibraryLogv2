<script setup>
import BasicModal from "components/Basics/BasicModal.vue";
import BasicTabsWithContent from "components/Basics/BasicTabsWithContent.vue";
import {ref} from "vue";
import Book from "src/models/Book";
import BookForm from "components/forms/BookForm.vue";
import GoogleBookForm from "components/forms/GoogleBookForm.vue";
import AddBookForm from "components/forms/AddBookForm.vue";

const props = defineProps({
  allCategories: {
    type: Array,
    default: [],
  },
  saveItem: {
    type: Function,
    required: true,
  }
});

let modal = ref(null);

function showModal() {
  modal.value.show();
}

function hideModal() {
  modal.value.hide();
}

function onModalClose() {

}

function save(item) {
  props.saveItem(item);
  hideModal();
}
</script>

<template>
  <q-btn @click="showModal" color="primary" icon="add" size="md" round></q-btn>

  <BasicModal ref="modal" :on-hide="onModalClose">
    <template #header>
      <div class="text-h6">
        <q-icon name="add"></q-icon>
        Add Item
      </div>
    </template>

    <template #content>
      <BasicTabsWithContent alignment="left" :tab-names="['Book', 'Movie']">
        <template #Book-tab>
          <span>
            <q-icon name="menu_book" size="md">
              <q-tooltip>Book</q-tooltip>
            </q-icon>
          </span>
        </template>
        <template #Movie-tab>
          <span>
            <q-icon name="movie" size="md">
              <q-tooltip>Movie</q-tooltip>
            </q-icon>
          </span>
        </template>
        <template #Book-content>
          <AddBookForm :all-categories="allCategories" :save-item="save"></AddBookForm>
        </template>
        <template #Movie-content>
          <p>Coming soon!</p>
        </template>
      </BasicTabsWithContent>
    </template>
  </BasicModal>
</template>

<style scoped>

</style>
