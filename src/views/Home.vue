<template>
  <div class="home">
    <div id="board" style="width: 450px; margin: 20px auto"></div>
    <p>Status: <span id="status"></span></p>
    <p>PGN: <span id="pgn"></span></p>
  </div>
</template>

<script>
import jQuery from 'jquery';
import Chess from 'chess.js';

const $ = jQuery;

export default {
  name: 'home',
  mounted() {
    let board;
    const game = new Chess();
    const statusEl = $('#status');
    const fenEl = $('#fen');
    const pgnEl = $('#pgn');

    // do not pick up pieces if the game is over
    // only pick up pieces for the side to move
    function onDragStart(source, piece) {
      if (game.game_over() === true
        || (game.turn() === 'w' && piece.search(/^b/) !== -1)
        || (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
      }
      return true;
    }

    function onDrop(source, target) {
      // see if the move is legal
      const move = game.move({
        from: source,
        to: target,
        promotion: 'q', // NOTE: always promote to a queen for example simplicity
      });

      // illegal move
      if (move === null) return 'snapback';

      updateStatus();
    }

    // update the board position after the piece snap
    // for castling, en passant, pawn promotion
    function onSnapEnd() {
      board.position(game.fen());
    }

    function updateStatus() {
      let status = '';

      let moveColor = 'White';
      if (game.turn() === 'b') {
        moveColor = 'Black';
      }

      // checkmate?
      if (game.in_checkmate() === true) {
        status = 'Game over, ' + moveColor + ' is in checkmate.';
      }

      // draw?
      else if (game.in_draw() === true) {
        status = 'Game over, drawn position';
      }

      // game still on
      else {
        status = moveColor + ' to move';

        // check?
        if (game.in_check() === true) {
          status += ', ' + moveColor + ' is in check';
        }
      }

      statusEl.html(status);
      // fenEl.html(game.fen());
      pgnEl.html(game.pgn());
    }

    const cfg = {
      draggable: true,
      position: 'start',
      onDragStart,
      onDrop,
      onSnapEnd,
    };
    board = window.ChessBoard('board', cfg);

    updateStatus();
  },
  data() {
    return {
      board: {},
    };
  },
};
</script>
