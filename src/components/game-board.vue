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
  width: 50vw;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-flow: row wrap;
}

.cell {
  flex-basis: calc(50vw / 5);
  height: calc(50vw / 5);
  margin: 2px;
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $dutch-white;
  border-radius: 2px;
  &.empty {
    background-color: hsl(180, 5%, 35.8%);
  }
  &.correct {
    background-color: $viridian;
    color: $dutch-white;
  }
}

@media (min-width: 750px) {
  .cell-container {
    width: 40vw;
    padding: 5px;
  }

  .cell {
    flex-basis: calc(40vw / 5);
    height: calc(40vw / 5);
    flex-shrink: 0;
    flex-grow: 0;
    &.empty {
      background-color: hsl(180, 5%, 35.8%);
    }
    &.correct {
      background-color: $viridian;
      color: $dutch-white;
    }
  }
}
</style>
