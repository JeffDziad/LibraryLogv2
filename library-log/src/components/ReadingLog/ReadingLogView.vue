<script setup>
import ReadingSession from "components/ReadingLog/ReadingSession.vue";
import {computed, inject} from "vue";
import { db } from "boot/firebase";
import { doc, updateDoc } from "firebase/firestore";
import LogSession from "src/models/LogSession";

const dupe = inject('dupe');
const showNotif = inject('showNotif');
const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
  libraryUid: {
    type: String,
    required: true,
  },
  readingLog: {
    type: Object,
    required: true,
  },
});

async function updateFirestore() {
  try {
    const docRef = doc(db, "libraries", props.libraryUid, "items", props.book.docId);
    await updateDoc(docRef, {
      "readingLog": dupe(props.readingLog)
    });
    showNotif('green', 'white', 'Updated Reading Log', 'check');
  } catch (e) {
    console.error(e);
    showNotif('red', 'white', 'Failed to update Reading Log', 'error');
  }
}

const activeSession = computed(() => {
  return props.readingLog.readingSessions.find((s) => s.active);
});

function startSession() {
  let session = new LogSession(Date.now(), props.book.pageCount);
  props.readingLog.readingSessions.push(session);
  updateFirestore();
}

function endSession() {
  if(activeSession.value.logEntries.find((e) => e.inProgress)) {
    showNotif("orange", 'white', 'Please finish your reading entry before ending the session!', "warning");
  } else {
    activeSession.value.active = false;
    updateFirestore();
  }
}

function sessionToggle() {
  if(activeSession.value) {
    endSession();
  } else {
    startSession();
  }
}
</script>

<template>
  <div class="row q-mb-md">
    <div class="col-6 q-pa-md" style="border-right: solid black 2px;">

      <div class="row">
        <div class="col">
          <q-circular-progress
            :value="25"
            size="lg"
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
    <q-btn @click="sessionToggle" :color="(activeSession)?'negative':'positive'">{{(activeSession)?'End Session':'Start Session'}}</q-btn>
  </div>
  <div class="row">

    <div class="col">
      <ReadingSession v-for="(s, index) in readingLog.readingSessions.slice().reverse()" :session="s" :session-index="readingLog.readingSessions.length - index"
        @update-firestore="updateFirestore"
      />
    </div>
  </div>

</template>

<style scoped>

</style>
