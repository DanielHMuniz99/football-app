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
  import { inject } from 'vue';

  const config = inject('config');
  const ligas = ref([]);
  const searchQuery = ref("");
  const router = useRouter();

  const filteredLigas = computed(() =>
    ligas.value.filter((liga) =>
      liga.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );

  const fetchLigas = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/leagues`);
      ligas.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar ligas:", error);
    }
  };

  const selectLeague = (leagueCode) => {
    router.push({ name: 'League', params: { leagueCode } });
  };

  onMounted(fetchLigas);
</script>
