<script setup>
// import Book from "src/models/Book";
// import {computed, ref} from "vue";
// import BasicLabel from "components/basics/BasicLabel.vue";
// import DeleteBookModal from "components/book/modal/DeleteBookModal.vue";
// import DetailBookModal from "components/book/modal/DetailBookModal.vue";
// import EditBookModal from "components/book/modal/EditBookModal.vue";
// import BasicEditButton from "components/basics/buttons/BasicEditButton.vue";
// import BasicDeleteButton from "components/basics/buttons/BasicDeleteButton.vue";
//
// defineOptions({
//   name: "BookCard",
// });
//
// const emit = defineEmits(['delete', 'update']);
const props = defineProps({
  item: {
    type: Object,
  },
  allCategories: {
    type: Array,
    default: [],
  },
  viewFormat: {
    type: String,
    required: true,
  }
});
//
// const editModal = ref(null);
// const deleteModal = ref(null);
//
// const imageUrl = computed(() => {
//   if(props.item.thumbnail) return props.item.thumbnail;
//   else return "https://www.prachiindia.com/ModuleFiles/Items/Cover_image.png";
// });
//
// const authors = computed(() => {
//   return props.item.authors.join(", ");
// });
//
// function showEditModal() {
//   editModal.value.showModal();
// }
//
// function showDeleteModal() {
//   deleteModal.value.showModal();
// }

</script>

<template>
  {{item}}
<!--<q-card class="q-mb-md">-->
<!--  <q-card-section horizontal>-->
<!--    <div class="thumbnail-wrapper">-->
<!--      <DetailBookModal ref="detailModal" :book="item" @show-edit-modal="showEditModal" @show-delete-modal="showDeleteModal">-->
<!--        <template #button="{openModal}">-->
<!--          <q-img class="col-5 thumbnail" :src="imageUrl" @click="openModal()">-->
<!--            <q-badge color="info" floating rounded><q-icon size="sm" name="ads_click"/></q-badge>-->
<!--          </q-img>-->
<!--        </template>-->
<!--      </DetailBookModal>-->
<!--    </div>-->
<!--    <q-card-section v-show="viewFormat==='list'">-->
<!--      <div>-->
<!--        <p class="text-h5 q-mb-none">{{item.title}}</p>-->
<!--        <p v-if="item.subtitle" class="text-italic text-subtitle1 q-mb-md q-pl-sm">{{item.subtitle}}</p>-->
<!--        <BasicLabel v-if="item.authors.length > 0" label="Author(s)" icon="group"><span class="text-subtitle2">{{authors}}</span></BasicLabel>-->
<!--        <BasicLabel label="ISBN" icon="numbers"><span class="text-subtitle2">{{item.isbn}}</span></BasicLabel>-->
<!--      </div>-->
<!--    </q-card-section>-->
<!--    <q-space/>-->
<!--    <q-card-actions v-show="viewFormat==='list'" vertical class="justify-between float-right q-gutter-none">-->
<!--      <EditBookModal ref="editModal" :book="item" :all-categories="allCategories" @update="(d) => emit('update', d)"/>-->
<!--      <q-space/>-->
<!--      <DeleteBookModal ref="deleteModal" :title="item.title" @confirmed="emit('delete')"/>-->
<!--    </q-card-actions>-->
<!--  </q-card-section>-->
<!--</q-card>-->
</template>

<style scoped>
.thumbnail {
  cursor: pointer;
  width: 220px;
  height: auto;
  transition: all 0.5s;
}

.thumbnail:hover {
  transform:scale(1.1);
  -ms-transform:scale(1.1);
  -moz-transform:scale(1.1);
  -webkit-transform:scale(1.1);
  -o-transform:scale(1.1);
  box-shadow: 0px 0px 15px -2px rgba(0,0,0,0.75);
  -webkit-box-shadow: 0px 0px 15px -2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 15px -2px rgba(0,0,0,0.75);
}

.thumbnail-wrapper {
  overflow: visible;
}
</style>
