<template>
  <aside class="sidebar">
    <h5 class="text-center">Ligas Esportivas</h5>
    <input
      type="text"
      class="form-control mb-3"
      placeholder="Buscar liga..."
      v-model="searchQuery"
    />

    <div class="row">
      <div 
        v-for="liga in filteredLigas" 
        :key="liga.id" 
        @click="selectLeague(liga.code)" 
        class="mt-2 clickable"
      >
        {{ liga.name }}
      </div>
    </div>
  </aside>
</template>
<script setup>
  import { ref, computed, onMounted } from "vue";
  import axios from "axios";
  import { useRouter } from 'vue-router';

  const ligas = ref([]);
  const searchQuery = ref("");

  const filteredLigas = computed(() =>
    ligas.value.filter((liga) =>
      liga.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );

  const fetchLigas = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/leagues");
      ligas.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar ligas:", error);
    }
  };

  const router = useRouter();

  const selectLeague = (leagueCode) => {
    router.push({ name: 'League', params: { leagueCode } });
  };

  onMounted(fetchLigas);
</script>

<style scoped>
  .sidebar {
    overflow-y: auto;
    background: #f8f9fa;
    padding: 15px;
    left: 0;
    top: 56px;
    width: 100%;
  }

  .clickable {
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: background 0.2s ease-in-out;
  }

  .clickable:hover {
    background: #e0e0e0;
  }
</style>
