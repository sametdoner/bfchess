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
    let board = new Chess();
    const game = new Chess();
    const statusEl = $('#status');
    const pgnEl = $('#pgn');

    function removeGreySquares() {
      $('#board .square-55d63').css('background', '');
    }

    function greySquare(square) {
      const squareEl = $('#board .square-' + square);

      var background = '#a9a9a9';
      if (squareEl.hasClass('black-3c85d') === true) {
        var background = '#696969';
      }
      squareEl.css('background', background);
    }

    function onDragStart(source, piece) {
    // do not pick up pieces if the game is over
    // or if it's not that side's turn
      if (game.game_over() === true || (game.turn() === 'w' && piece.search(/^b/) !== -1)
        || (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
      }
      return true;
    }

    function onDrop(source, target) {
      removeGreySquares();

      // see if the move is legal
      const move = game.move({
        from: source,
        to: target,
        promotion: 'q', // NOTE: always promote to a queen for example simplicity
      });
      // illegal move
      if (move === null) {
        return 'snapback';
      }
      return true;
    }

    function onMouseoverSquare(square) {
    // get list of possible moves for this square
      const moves = game.moves({
        square,
        verbose: true,
      });

      // exit if there are no moves available for this square
      if (moves.length === 0) return;

      // highlight the square they moused over
      greySquare(square);

      // highlight the possible squares for this piece
      for (let i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
      }
    }

    function onMouseoutSquare() {
      removeGreySquares();
    }

    function onSnapEnd() {
      board.position(game.fen());
    }

    function updateStatus() {
      let status = '';
      let moveColor = 'White';

      if (game.turn() === 'b') { moveColor = 'Black'; }

      // checkmate?
      if (game.in_checkmate() === true) { status = 'Game over, ' + moveColor + ' is in checkmate.'; }

      // draw?
      else if (game.in_draw() === true) { status = 'Game over, drawn position'; }

      // game still on
      else {
        // status = `${moveColor} + ' to move'`;
        status = moveColor + ' to move';

        // check?
        if (game.in_check() === true) {
          status += `', ' + ${moveColor} + ' is in check'`;
        }
      }
      statusEl.html(status);
      pgnEl.html(game.pgn());
    }

    const cfg = {
      draggable: true,
      position: 'start',
      onDragStart,
      onDrop,
      onMouseoutSquare,
      onMouseoverSquare,
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
