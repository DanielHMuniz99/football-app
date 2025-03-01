<template>
  <div class="row py-2 align-items-center">
    <div class="col-2 align-items-center">
      {{ jogo.utcDate }}
    </div>
    <div class="col-8">
      <div class="col-12 text-start">
        {{ jogo.time1 }}
      </div>
      <div class="col-12 text-start">
        {{ jogo.time2 }}
      </div>
    </div>
    <div class="col-2">
      <div class="col-12 text-start">
        <b>{{ jogo.score.home }}</b>
      </div>
      <div class="col-12 text-start">
        <b>{{ jogo.score.away }}</b>
      </div>
    </div>
  </div>
  <hr>
</template>

<script>
export default {
  props: {
    jogo: Object,
  },
};
</script>