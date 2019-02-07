<template>
  <div class="home">
    <div class="col-sm-12">
      <div id="board"></div>
      <p>Status: <span id="status"></span></p>
      <p>PGN: <span id="pgn"></span></p>
    </div>
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

    function removeGreySquares() {
      $('#board .square-55d63').css('background', '');
    }

    function greySquare(square) {
      const squareEl = $(`#board .square-${square}`);

      let background = '#a9a9a9';
      if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
      }

      squareEl.css('background', background);
    }
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
        status = `Game over,  ${moveColor} is in checkmate.`;
        alert(status);
      }

      // draw?
      else if (game.in_draw() === true) {
        status = 'Game over, drawn position';
        alert(status);
      }

      // game still on
      else {
        status = `${moveColor} turn`;

        // check?
        if (game.in_check() === true) {
          status += `, ${moveColor}  is in check`;
        }
      }

      statusEl.html(status);
      pgnEl.html(game.pgn());
      // fenEl.html(game.fen());
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

    const cfg = {
      draggable: true,
      position: 'start',
      onDragStart,
      onDrop,
      onSnapEnd,
      onMouseoutSquare,
      onMouseoverSquare,
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

<style>
  #board {
    width: 450px;
    margin: 20px auto;
  }
</style>
