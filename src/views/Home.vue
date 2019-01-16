<template>
  <div class="home">
    <div id="board" style="width: 450px; margin: 20px auto"></div>
    <input type="button" @click.prevent="startgame" value="Start" />
    <!-- <input type="button" id="clearBtn" value="Clear" /> -->
  </div>


</template>

<script>
// @ is an alias to /src
// import Navbar from '@/components/Navbar.vue';
// import 'chessboardjs';

// import jQuery from 'jquery';
// const $ = jQuery;

export default {
  name: 'home',
  mounted() {
    this.board = window.ChessBoard('board', {
      draggable: true,
      dropOffBoard: 'trash',
      sparePieces: true,
    });
    // $('#startBtn').on('click', );
    // $('#clearBtn').on('click', board.clear);
  },
  methods: {
    startgame() {
      console.log('hop');
      console.log(this.board);
      this.board.start();
      // const board = Chessboard('board');
      // $('#startBtn').on('click', board.start);
      // $('#clearBtn').on('click', board.clear);
    },
  },
  data() {
    return {
      board: {},
    };
  },
};
</script>
