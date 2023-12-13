<script setup>
import FinishedReadingModal from "components/modals/FinishedReadingModal.vue";
import {computed} from "vue";

const emit = defineEmits(['finished']);
const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  owned: {
    type: Boolean,
    default: true,
  }
});

const entryTitle = computed(() => {
  let start = new Date(props.entry.startTime);
  let fStart = formatDateToTime(start);
  if(props.entry.endTime) {
    let end = new Date(props.entry.endTime);
    let fEnd = formatDateToTime(end);
    let diff = minutesDiff(end, start);
    return `${fStart} - ${fEnd} (${diff} min)`;
  } else {
    return fStart;
  }
});

function formatDateToTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes().toString().padStart(2, 'O');
  let period = hours >= 12 ? 'PM' : 'AM';
  hours = (hours % 12) || 12;
  return `${hours}:${minutes} ${period}`;
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}:${minutes}:${remainingSeconds}`;
}

function minutesDiff(date1, date2) {
  const differenceMilliseconds = Math.abs(date2 - date1);
  return Math.floor(differenceMilliseconds / (1000 * 60));
}

function finishedReading(pageCount) {
  emit('finished', pageCount);
}

const statusIcon = computed(() => {
  if(props.entry.inProgress) {
    return "schedule";
  } else {
    return "check";
  }
});

const statusColor = computed(() => {
  switch(statusIcon.value) {
    case "schedule":
      return "grey";
    case "check":
      return "positive";
    default:
      return "grey";
  }
});

function dateToSlash(d) {
  let date = new Date(d);
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${month}/${day}/${year}`;
}
</script>

<template>
  <q-timeline-entry :title="entryTitle" :subtitle="dateToSlash(entry.startTime)" :icon="statusIcon" :color="statusColor">

    <div v-if="!entry.inProgress">
      Read To Page: {{entry.pagesRead}}
    </div>
    <div v-if="entry.inProgress">
      <FinishedReadingModal v-if="owned" ref="finishedReadingModal" @finished="finishedReading" :min="min" :max="max">
        <template #button="{showModal}">
          <q-btn @click="showModal" v-if="entry.inProgress" color="positive" class="q-mt-md">Finish Reading</q-btn>
        </template>
      </FinishedReadingModal>
    </div>
  </q-timeline-entry>
</template>

<style scoped>

</style>
