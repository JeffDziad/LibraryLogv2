<script setup>
import {inject, onMounted, ref} from "vue";
const eid = inject('eid');

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  showCursor: {
    type: Boolean,
    default: true,
  },
  letterUpdateRange: {
    type: Number,
    default: 350,
  },
  cursorBlinkInterval: {
    type: Number,
    default: 750,
  },
  repeat: {
    type: Boolean,
    default: false,
  }
});

const id = ref(null);
const textElement = ref(null);
const cursorElement = ref(null);
const letters = ref([...props.text]);
const currentLetter = ref(0);

function diff(a, b) {
  return Math.abs(a-b);
}

function init() {
  for(let i = 0; i < letters.value.length; i++) {
    let l = document.createElement('span');
    l.innerText = letters.value[i];
    l.id = id.value + "-" + i;
    l.style.display = 'none';
    l.classList.add(id.value + "-letter");
    textElement.value.append(l);
  }
}

function updateLetter() {
  if(diff(performance.now(), updateLetter.last) > updateLetter.interval) {
    let children = textElement.value.children;
    for(let i = 0; i < children.length; i++) {
      if(children[i].id === id.value + "-cursor") continue;
      if(children[i].style.display === 'none') {
        currentLetter.value = i;
        let parentNode = children[i].parentNode;
        parentNode.insertBefore(cursorElement.value, children[i+1])
        children[i].style.display = 'inline';
        break;
      }
    }
    updateLetter.last = performance.now();
    updateLetter.interval = Math.random() * props.letterUpdateRange;
  }
}
updateLetter.last = 0;
updateLetter.interval = 100;

function cursor() {
  if(diff(performance.now(), cursor.last) > cursor.interval) {
    if(cursorElement.value.style.display === 'none') {
      cursorElement.value.style.display = 'inline';
    } else {
      cursorElement.value.style.display = 'none';
    }
    cursor.last = performance.now();
  }
}
cursor.last = 0;
cursor.interval = props.cursorBlinkInterval;

function clock() {
  if(textElement.value) {
    cursor();
    updateLetter();
  }
  requestAnimationFrame(clock);
}

onMounted(() => {
  id.value = 'typingText-' + eid();
  init();
  clock();
});
</script>

<template>
  <div>
    <span ref="textElement" :id="id">
      <span ref="cursorElement" :id="id + '-cursor'">{{(showCursor)?'_':''}}</span>
    </span>
  </div>
</template>
