<script>
import { boardFactory, moveCell, randomizeBoard } from "./game-src/board";
export default {
  data() {
    return {
      board: [],
    };
  },
  methods: {
    moveCell,
    cellClick(index, board) {
      this.moveCell(index, board);
    },
  },
  mounted() {
    this.board = boardFactory(4);
    randomizeBoard(22, this.board);
  },
};
</script>

<template>
  <main class="main">
    <div class="cell-container">
      <div
        v-for="(cellNumber, index) in board.cells"
        :key="cellNumber"
        class="cell"
        @click="cellClick(index, board)"
        :class="{ empty: cellNumber === 0, correct: cellNumber === index + 1 }"
      >
        <div v-if="cellNumber > 0" class="number">
          {{ cellNumber }}
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import "./assets/base.scss";
$color: black;
main {
  min-height: 100vh;
  height: fit-content;
  width: 100vw;
  background-color: $eerie-black;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cell-container {
  min-width: 300px;
  min-height: 300px;
  border-radius: 0.2rem;
  justify-content: space-between;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(4, calc((300px / 4) - 10px));
  padding: 5px;
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc((300px / 4) - 10px);
  background-color: $dutch-white;
  border-radius: 2px;
  &.empty {
    background-color: hsla(158.2, 39.1%, 28.6%, 0.6);
    color: hsla(158.2, 39.1%, 28.6%, 0.6);
  }
  &.correct {
  }
}
</style>
