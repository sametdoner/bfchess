<template>
  <div class="home">
    <div id="board" style="width=400px"></div>
    <div id="example">
  <button v-on:click="greet">Greet</button>
</div>
  </div>

</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue';

// import JQuery from 'jquery';
// let $ = JQuery;

export default {
  name: 'home',
  methods: {

  },
  components: {
    Navbar,
  },
};
</script>
