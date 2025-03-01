<template>
  <div class="col-12">
    <h3 v-if="selectedLeague">Liga Selecionada: {{ selectedLeague }}</h3>
  </div>

  <div class="col-2">
    <select class="form-select">
      <option value="ongoing">Jogos ao Vivo</option>
      <option value="results">Resultados</option>
      <option value="upcoming">Próximos Jogos</option>
    </select>
  </div>
  <hr>
  <Match v-for="jogo in jogosFiltrados" :key="jogo.id" :jogo="jogo" />
</template>

<script setup>
  import { ref, computed, defineProps, onMounted, watch } from "vue";
  import axios from "axios";
  import { useRoute } from 'vue-router';
  import Match from './Match.vue';
  import moment from 'moment';
  import { inject } from 'vue';

  const config = inject('config');
  const route = useRoute();
  const selectedLeague = ref(route.params.leagueCode || null);
  const jogos = ref([]);
  const filtroSelecionado = ref("results");

  const jogosFiltrados = computed(() => {
    return jogos.value.filter((jogo) => jogo.status === filtroSelecionado.value);
  });

  const fetchGames = async (leagueCode) => {
    try {
      const response = await axios.get(`${config.apiUrl}/leagues/${leagueCode}/matches/results`);
      jogos.value = response.data.matches.map(match => ({
        id: match.id,
        time1: match.homeTeam.shortName,
        time2: match.awayTeam.shortName,
        score: {
          home: match.score.fullTime.home,
          away: match.score.fullTime.away
        },
        utcDate: new Date(match.utcDate).toLocaleDateString("pt-BR"),
        status: match.status === "TIMED" ? "upcoming" : "results",
      }));
      
      // console.log("Jogos atualizados:", jogos.value);
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
