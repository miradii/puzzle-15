<script>
import { boardFactory, randomizeBoard } from "./game-src/board.js";
import GameBoard from "./components/game-board.vue";
export default {
  components: { GameBoard },
  data() {
    return {
      board: [],
      playing: false,
      started: false,
      time: 0,
      interval: null,
    };
  },
  methods: {
    startGame() {
      this.time = 0;
      clearInterval(this.interval);
      randomizeBoard(65, this.board);
      this.started = true;
      this.playing = true;
      this.interval = setInterval(this.incrementTimer, 100);
    },
    pauseHandler() {
      if (this.playing) {
        this.playing = false;
        clearInterval(this.interval);
      } else {
        this.playing = true;
        this.interval = setInterval(this.incrementTimer, 100);
      }
    },
    incrementTimer() {
      this.time++;
    },
    handleWin() {
      alert("You Win");
      this.started = false;
      this.playing = false;

      clearInterval(this.interval);
    },
  },
  mounted() {
    this.board = boardFactory(4);
  },
};
</script>

<template>
  <main class="main">
    <div class="hud">
      <span>Time: {{ time }}</span>
      <span>Moves: {{ board.moves }}</span>
    </div>
    <div class="game">
      <GameBoard @win="handleWin" :board="board" :playing="playing" />
      <div class="menu">
        <button @click="startGame" class="btn">New Game</button>
        <button v-if="started" @click="pauseHandler" class="btn">
          <span v-if="playing">Pause</span>
          <span v-else>Resume</span>
        </button>
      </div>
    </div>

    <a href="https://github.com/miradii/puzzle-15">Source Code</a>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hud {
  color: $dutch-white;
  padding: 1rem;
  width: 70%;
  * {
    margin: 1rem;
  }
}
.game {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
}
.menu {
  display: flex;
  flex-basis: 45%;
  flex-direction: column;
  justify-content: center;
}
.btn {
  border: 0.2rem solid $lavender-blue;
  background-color: $eerie-black;
  flex-basis: 45px;
  color: $dutch-white;
  font-size: 1.4rem;
  width: 45%;
  margin: 1rem;
  cursor: pointer;
  &:hover {
    background-color: $lavender-blue;
    color: $eerie-black;
    transition: 0.3s ease;
  }
}
a {
  text-decoration: none;
  color: $dutch-white;
  font-size: 14px;
  bottom: 0;
}
</style>
