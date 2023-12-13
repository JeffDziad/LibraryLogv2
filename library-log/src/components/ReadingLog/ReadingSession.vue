<script setup>
import {computed, onMounted, ref} from "vue";
import ReadingLogEntry from "src/models/ReadingLogEntry";
import FinishedReadingModal from "components/modals/FinishedReadingModal.vue";
import LogEntry from "components/ReadingLog/LogEntry.vue";

const emit = defineEmits(['updateFirestore']);
const props = defineProps({
  session: {
    type: Object,
    required: true,
  },
  sessionIndex: {
    type: Number,
  },
  owned: {
    type: Boolean,
    default: true,
  }
});

const startDateFormatted = computed(() => {
  return dateToSlash(props.session.startTime);
});

function dateToSlash(d) {
  let date = new Date(d);
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${month}/${day}/${year}`;
}

const statusIcon = computed(() => {
  if(props.session.active) {
    return "schedule";
  } else {
    if(props.session.pagesToRead === props.session.pagesRead) {
      return "check";
    }
  }
  return "close";
});

const statusColor = computed(() => {
  switch(statusIcon.value) {
    case "schedule":
      return "accent";
    case "check":
      return "positive";
    case "close":
      return "negative";
    default:
      return "grey";
  }
});

const currentEntry = computed(() => {
  return props.session.logEntries.find((s) => s.inProgress);
});

function startReading() {
  let entry = new ReadingLogEntry(Date.now());
  props.session.logEntries.push(entry);
  emit('updateFirestore');
}

function finishedReading(pageCount) {
  let p = parseInt(pageCount);
  currentEntry.value.endTime = Date.now();
  props.session.pagesRead = p;
  currentEntry.value.pagesRead = p;
  currentEntry.value.inProgress = false;

  //! VERIFY IF BOOK IS COMPLETED - IF SO CHECK FOR ACHIEVEMENTS
  if(props.session.pagesRead === props.session.pagesToRead) {
    props.session.active = false;
  }

  emit('updateFirestore');
}

const percentDeci = computed(() => {
  return (props.session.pagesRead / props.session.pagesToRead).toFixed(2);
});

const percentFormatted = computed(() => {
  return percentDeci.value * 100;
});
</script>

<template>
  <q-expansion-item
    dark
    expand-separator
    :class="`bg-${statusColor}`"
    :icon="statusIcon"
    :label="'Session ' + (sessionIndex)"
    :caption="startDateFormatted"
  >
    <q-card>
      <q-card-section>
        {{percentFormatted.toFixed(1)}}%
        <q-linear-progress size="md" :value="percentDeci" color="primary"></q-linear-progress>
      </q-card-section>
      <q-card-section>
        <div v-if="!session.active && session.logEntries.length <= 0">
          Try harder next time!
        </div>
        <q-timeline color="secondary">
          <LogEntry v-for="e in session.logEntries" :entry="e" :min="session.pagesRead" :max="session.pagesToRead" @finished="finishedReading" :owned="owned"></LogEntry>
          <q-btn @click="startReading" color="positive" v-if="(session.active && !currentEntry) && owned">Start Reading</q-btn>
        </q-timeline>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<style scoped>

</style>
