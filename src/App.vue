<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <Header />
  <div class="d-flex">
    <Sidebar />
    <router-view />
  </div>
</template>
