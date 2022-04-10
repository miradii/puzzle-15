<script>
import {
  moveCell,
  checkBoardState,
  moveUp,
  moveRight,
  moveLeft,
  moveDown,
} from "../game-src/board";
export default {
  props: ["board", "playing"],

  methods: {
    moveCell,
    moveUp,
    moveRight,
    moveLeft,
    moveDown,

    cellClick(index, board) {
      if (this.playing) {
        this.moveCell(index, board);
        if (checkBoardState(board)) this.$emit("win");
      }
    },
  },
};
</script>

<template>
  <div class="cell-container">
    <div
      v-for="(cellNumber, index) in board.cells"
      :key="cellNumber"
      class="cell"
      @click="cellClick(index, board)"
      @keypress.down="moveDown"
      :class="{ empty: cellNumber === 0, correct: cellNumber === index + 1 }"
    >
      <div v-if="cellNumber > 0" class="number">{{ cellNumber }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/base.scss";
.cell-container {
  min-width: 400px;
  min-height: 400px;
  border-radius: 0.2rem;
  justify-content: space-between;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(4, calc((400px / 4) - 10px));
  padding: 5px;
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc((400px / 4) - 10px);
  background-color: $dutch-white;
  border-radius: 2px;
  animation: bounceIn, 3s linear;
  &.empty {
    background-color: hsl(180, 5%, 35.8%);
  }
  &.correct {
    background-color: $viridian;
    color: $dutch-white;
  }
}
</style>
