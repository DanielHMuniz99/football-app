<template>
  <div class="main-content">
    <h3 v-if="selectedLeague">Liga Selecionada: {{ selectedLeague }}</h3>

    <div class="row mb-3">
      <div class="col-md-4">
        <select v-model="filtroSelecionado" class="form-select">
          <option value="ao-vivo">Jogos ao Vivo</option>
          <option value="anteriores">Resultados Anteriores</option>
          <option value="proximos">Próximos Jogos</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div v-for="jogo in jogosFiltrados" :key="jogo.id" class="col-md-6">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ jogo.time1 }} vs {{ jogo.time2 }}</h5>
            <p class="card-text">
              <strong>Data:</strong> {{ jogo.data }} <br />
              <strong>Status:</strong> {{ jogo.status }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute } from 'vue-router';

const route = useRoute();
const selectedLeague = ref(route.params.leagueCode || null);

watch(() => route.params.leagueCode, (newLeague) => {
  selectedLeague.value = newLeague;
  fetchGames(newLeague);
});

const fetchGames = async (leagueCode) => {
  console.log(`Buscando jogos para a liga: ${leagueCode}`);
};

const props = defineProps({
  selectedLeague: String,
});

const filtroSelecionado = ref("ao-vivo");

const fetchMatches = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/leagues/PL/matches/upcoming");
    console.log(response.data.matches)
  } catch (error) {
    console.error("Erro ao buscar ligas:", error);
  }
};

const jogos = ref([
  { id: 1, time1: "Flamengo", time2: "Palmeiras", data: "20/02/2025", status: "ao-vivo" },
  { id: 2, time1: "Real Madrid", time2: "Barcelona", data: "18/02/2025", status: "anteriores" },
  { id: 3, time1: "PSG", time2: "Bayern", data: "22/02/2025", status: "proximos" },
  { id: 4, time1: "Manchester City", time2: "Liverpool", data: "20/02/2025", status: "ao-vivo" },
  { id: 5, time1: "Inter", time2: "Milan", data: "15/02/2025", status: "anteriores" },
]);

const jogosFiltrados = computed(() => {
  return jogos.value.filter((jogo) => jogo.status === filtroSelecionado.value);
});

</script>
