<script setup>
import BasicFullScreenModal from "components/Basics/BasicFullScreenModal.vue";
import {onMounted, ref} from "vue";
import BasicLabel from "components/Basics/BasicLabel.vue";
import BasicPillsArray from "components/Basics/BasicPillsArray.vue";
import BasicEditButton from "components/Basics/BasicEditButton.vue";
import BasicDeleteButton from "components/Basics/BasicDeleteButton.vue";
import EditBookModal from "components/modals/EditBookModal.vue";
import DeleteBookModal from "components/modals/DeleteBookModal.vue";
import BasicTabsWithContent from "components/Basics/BasicTabsWithContent.vue";

const emit = defineEmits(['showEditModal', 'showDeleteModal']);
const props = defineProps({
  book: {
    type: Object,
  },
  allCategories: {
    type: Array,
    default: [],
  },

});

const modal = ref(null);

function openModal() {
  modal.value.show();
}

function showEditModal() {
  emit('showEditModal');
}

function showDeleteModal() {
  emit('showDeleteModal');
}
</script>

<template>
<slot name="button" :openModal="openModal">
  <q-btn @click="openModal">Open</q-btn>
</slot>

<BasicFullScreenModal ref="modal">
  <template #header>
    Book Details
  </template>
  <template #content>
    <div class="container">

      <BasicTabsWithContent :tab-names="['Info', 'Log']" alignment="left">
        <template #Info-tab>
          <span><q-icon name="info" size="md"/>&nbsp;Info</span>
        </template>
        <template #Log-tab>
          <span><q-icon name="list" size="md"/>&nbsp;Reading Log</span>
        </template>

        <template #Info-content>
          <div class="row q-mt-md">
            <div class="col flex justify-center q-pr-md q-mb-md">
              <div class="row">
                <div class="col-12 flex justify-center q-pb-md">
                  <q-img fit="contain" width="250px" :src="book.thumbnail" class="thumbnail"></q-img>
                </div>
                <div class="col-6">
                  <BasicEditButton :show-modal="showEditModal">
                    <q-tooltip class="bg-dark text-body2">
                      Edit
                    </q-tooltip>
                  </BasicEditButton>
                </div>
                <div class="col-6">
                  <BasicDeleteButton :show-modal="showDeleteModal">
                    <q-tooltip class="bg-negative text-body2">
                      Delete
                    </q-tooltip>
                  </BasicDeleteButton>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <p class="text-h5 q-mb-none">{{book.title}}</p>
              <p v-if="book.subtitle" class="text-italic text-subtitle1 q-mb-md q-pl-sm">{{book.subtitle}}</p>
              <hr>
              <BasicLabel v-if="book.authors.length > 0" label="Author(s)" icon="group">
                <p>{{book.authors.join(', ')}}</p>
              </BasicLabel>
              <BasicLabel v-if="book.isbn" label="ISBN" icon="tag">
                <p>{{book.isbn}}</p>
              </BasicLabel>
              <BasicLabel v-if="book.publisher" label="Publisher" icon="print">
                <p>{{book.publisher}}</p>
              </BasicLabel>
              <BasicLabel v-if="book.publishedDate" label="Publish Date" icon="event">
                <p>{{book.publishedDate}}</p>
              </BasicLabel>
              <BasicLabel v-if="book.categories.length>0" label="Categories" icon="category">
                <BasicPillsArray :pills="book.categories"></BasicPillsArray>
              </BasicLabel>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <BasicLabel v-if="book.description" label="Description" icon="description">
                <p>{{book.description}}</p>
              </BasicLabel>
            </div>
          </div>
        </template>
        <template #Log-content>

          <div class="row q-mb-md">
            <div class="col-6 q-pa-md" style="border-right: solid black 2px;">

              <div class="row">
                <div class="col">
                  <q-circular-progress
                    :value="25"
                    size="150px"
                    :thickness="0.2"
                    color="accent"
                    center-color="grey-8"
                    track-color="transparent"
                    class="q-ma-md"
                  />
                </div>
              </div>

            </div>
            <div class="col-6 q-pa-md">
              Overall Stats and Achievements
            </div>
          </div>
          <div class="col-12 q-mb-md q-pb-md flex justify-between" style="border-bottom: solid black 2px;">
            <span class="text-h4">Sessions</span>
            <q-btn color="negative">Stop Session</q-btn>
          </div>
          <div class="row">

            <div class="col">
              <q-expansion-item
                expand-separator
                class="bg-accent"
                icon="schedule"
                label="Session 2"
                caption="Fri Sept 21, 2023"
              >
                <q-card>
                  <q-card-section>
                    <q-timeline color="secondary">

                      <q-timeline-entry
                        title="9:21PM - 10:21PM (1 hr)"
                        subtitle="Thur Sept 21, 2023"
                        icon="check"
                        color="positive"
                      >
                        <div>
                          Page: 25
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry
                        title=""
                        subtitle=""
                        icon="add"
                        color="grey"
                      >
                        <template #subtitle class="q-pt-none">
                          <span>
                            <q-btn>Start</q-btn>
                          </span>
                        </template>
                        <div>

                        </div>
                      </q-timeline-entry>
                    </q-timeline>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item
                expand-separator
                class="bg-positive"
                icon="check"
                label="Session 1"
                caption="Thur Sept 21, 2023 - Wed Oct 2, 2023"
              >
                <q-card>
                  <q-card-section>
                    <q-linear-progress size="lg" :value="100" class="q-mt-md" />
                    <span>Progress: 100%</span>
                  </q-card-section>
                  <q-card-section>
                    <q-timeline color="secondary">

                      <q-timeline-entry
                        title="9:21PM - 10:21PM (1 hr)"
                        subtitle="Thur Sept 21, 2023"
                        icon="check"
                        color="positive"
                      >
                        <div>
                          Page: 25
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry
                        title="3:43PM - 5:43PM (2 hrs)"
                        subtitle="Wed Oct 2, 2023"
                        icon="check"
                        color="positive"
                      >
                        <div>
                          Page: 216
                        </div>
                      </q-timeline-entry>
                      <q-timeline-entry
                        title="Completed!"
                        subtitle="Wed Oct 2, 2023"
                        icon="check"
                        color="positive"
                      >
                        <div>

                        </div>
                      </q-timeline-entry>
                    </q-timeline>
                  </q-card-section>
                </q-card>
              </q-expansion-item>

            </div>
          </div>

        </template>
      </BasicTabsWithContent>
    </div>
  </template>
</BasicFullScreenModal>
</template>

<style scoped>
.thumbnail {
  //filter: drop-shadow(0 0 20px black);
}
</style>
