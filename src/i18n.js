import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    live_games: "Live Games",
    results: "Results",
    next_games: "Next Games",
  },
  pt: {
    live_games: "Jogos ao Vivo",
    results: "Resultados",
    next_games: "Próximos Jogos",
  }
};

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
});

export default i18n;
