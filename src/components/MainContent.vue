<template>
  <div class="col-12">
    <h3 v-if="selectedLeague">Liga Selecionada: {{ selectedLeague }}</h3>
  </div>

  <div class="col-12">
    <select class="form-select">
      <option value="ao-vivo">Jogos ao Vivo</option>
      <option value="anteriores">Resultados Anteriores</option>
      <option value="proximos">Próximos Jogos</option>
    </select>
  </div>
  <Match v-for="jogo in jogosFiltrados" :key="jogo.id" :jogo="jogo" />
</template>

<script setup>
  import { ref, computed, defineProps, onMounted, watch } from "vue";
  import axios from "axios";
  import { useRoute } from 'vue-router';
  import Match from './Match.vue';

  const route = useRoute();
  const selectedLeague = ref(route.params.leagueCode || null);

  const jogos = ref([]);

  const filtroSelecionado = ref("proximos");

  const jogosFiltrados = computed(() => {
    return jogos.value.filter((jogo) => jogo.status === filtroSelecionado.value);
  });

  const fetchGames = async (leagueCode) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/leagues/${leagueCode}/matches/upcoming`);

      jogos.value = response.data.matches.map(match => ({
        id: match.id,
        time1: match.homeTeam.shortName,
        time2: match.awayTeam.shortName,
        data: new Date(match.utcDate).toLocaleDateString("pt-BR"),
        status: match.status === "TIMED" ? "proximos" : "ao-vivo",
      }));
      
      console.log("Jogos atualizados:", jogos.value);
    } catch (error) {
      console.error("Erro ao buscar jogos:", error);
    }
  };

  watch(() => route.params.leagueCode, (newLeague) => {
    selectedLeague.value = newLeague;
    if (newLeague) {
      fetchGames(newLeague);
    }
  });

  onMounted(() => {
    if (selectedLeague.value) {
      fetchGames(selectedLeague.value);
    }
  });
</script>
