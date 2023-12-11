<template>
  <q-page class="">
    <div class="container">
      <div style="height: 90vh;" class="row flex justify-center items-center">
        <div class="col-xs-12 col-md-6 flex justify-center">
          <img src="https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-book-clipart-vector-png-image_6653535.png" alt="Books Clipart"/>
        </div>
        <div class="col-xs-12 col-md-6">
          <div class="row">
            <div class="col-12">
              <TypingText class="text-h4 text-weight-bold" :show-cursor="false" :letter-update-range="50" text="Welcome to Library Log!"/>
              <TypingText class="text-h6" :show-cursor="false" :letter-update-range="50" text="Your personalized virtual library."/>
              <hr>
            </div>
            <div class="col-12 q-py-lg">
              <q-btn @click="getStarted" size="md" class="text-black" outline>{{(authUser.user)?'My Library':'Get Started'}}</q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import TypingText from "components/Basics/TypingText.vue";

export default defineComponent({
  name: 'IndexPage',
  components: {TypingText},
});
</script>

<script setup>
import {useAuthUser} from "src/store/authUser";
import {useRouter} from "vue-router";

const emit = defineEmits(['openAccountMenu']);

const authUser = useAuthUser();
const router = useRouter();

function getStarted() {
  if(authUser.user) {
    router.push('/my-library');
  } else {
    emit('openAccountMenu');
  }
}
</script>
