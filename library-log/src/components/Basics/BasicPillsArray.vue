<script setup>
import {inject, onMounted, ref} from "vue";

const randInRange = inject('randInRange');

const props = defineProps({
  pills: {
    type: Array,
    required: true,
  }
});

function genColor() {
  let r = randInRange(0, 150);
  let g = randInRange(0, 150);
  let b = randInRange(0, 150);
  return `rgb(${r}, ${g}, ${b})`;
}
</script>

<template>
<p class="pill inline-block" :style="{backgroundColor: genColor(), color: 'white'}" v-for="p in pills">{{p}}</p>
</template>

<style scoped>
.pill {
  margin: 5px;
  padding: 5px;
  border-radius: 15px;
}
</style>
