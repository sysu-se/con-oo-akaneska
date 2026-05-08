<script>
  import { gameStore } from './stores/gameStore';
  import SudokuBoard from './components/SudokuBoard.svelte';

  $: ({ grid, solved } = $gameStore);
</script>

<main>
  <h1>Sudoku</h1>
  <SudokuBoard {grid} on:input={e => {
    gameStore.setCell(e.detail.r, e.detail.c, e.detail.v);
  }} />

  <div style="margin-top:16px;">
    <button on:click={() => gameStore.undo()}>Undo</button>
    <button on:click={() => gameStore.redo()}>Redo</button>
  </div>

  {#if solved}
    <h2 style="color:green;">✅ Solved!</h2>
  {/if}
</main>