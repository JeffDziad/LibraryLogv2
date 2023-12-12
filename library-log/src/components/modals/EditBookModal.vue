<script setup>
import BookForm from "components/forms/BookForm.vue";
import BasicModal from "components/Basics/BasicModal.vue";
import {inject, ref, watch} from "vue";
import BasicEditButton from "components/Basics/BasicEditButton.vue";
const dupe = inject('dupe');

const emit = defineEmits(['update']);
const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
  allCategories: {
    type: Array,
    default: [],
  }
});

const modal = ref(null);
const editable = ref(dupe(props.book));

function showModal() {
  editable.value = dupe(props.book);
  modal.value.show();
}

function submit() {
  emit('update', editable.value);
  modal.value.hide();
}

watch(props.book, (n, o) => {
  editable.value = dupe(n);
});

defineExpose({
  showModal,
});

</script>

<template>
  <slot name="button" :showModal="showModal">
    <BasicEditButton :show-modal="showModal"/>
  </slot>

  <BasicModal ref="modal">
    <template #header>
      <div class="text-h6">
        <q-icon name="edit"/>
        Edit Book
      </div>
    </template>
    <template #content>
      <BookForm :book="editable" :all-categories="allCategories" @valid-submit="submit"></BookForm>
    </template>
  </BasicModal>
</template>

<style scoped>

</style>
