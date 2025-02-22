<template>
    <aside class="sidebar">
      <h5 class="text-center">Ligas Esportivas</h5>
      <input type="text" class="form-control mb-3" placeholder="Buscar liga..." v-model="searchQuery" />
  
      <div class="row">
        <div v-for="liga in filteredLigas" :key="liga.id">
          {{ liga.nome }}
        </div>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';

  const ligas = ref([
    { id: 1, nome: 'Premier League' },
    { id: 2, nome: 'La Liga' },
    { id: 3, nome: 'Bundesliga' },
    { id: 4, nome: 'Serie A' },
    { id: 5, nome: 'Ligue 1' },
    { id: 6, nome: 'MLS' },
    { id: 7, nome: 'Brasileirão' },
    { id: 8, nome: 'Copa Libertadores' },
  ]);
  
  const searchQuery = ref('');
  const filteredLigas = computed(() =>
    ligas.value.filter(liga =>
      liga.nome.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
  </script>
  
  <style scoped>
  .sidebar {
    width: 20%;
    height: 100vh;
    overflow-y: auto;
    background: #f8f9fa;
    padding: 15px;
    position: fixed;
    left: 0;
    top: 56px;
  }
  </style>  