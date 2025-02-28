<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div class="row gx-0">
    <div class="col-12">
      <Header/>
    </div>
  </div>
  <div class="row gx-0">
    <div class="col-3">
      <Sidebar/>
    </div>
    <div class="col-9">
      <router-view/>
    </div>
  </div>
</template>
