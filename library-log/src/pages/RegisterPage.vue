<script setup>
import RegisterForm from "components/forms/RegisterForm.vue";
</script>

<template>
  <div class="bg-white absolute-center q-pa-lg">
    <RegisterForm/>
  </div>
</template>

<style scoped>
.absolute-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 25px;
}
</style>
