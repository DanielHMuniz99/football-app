<template>
    <div class="row">
        <div class="col-12">
            {{ jogo.time1 }}
        </div>
        <div class="col-12">
            {{ jogo.time2 }}
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