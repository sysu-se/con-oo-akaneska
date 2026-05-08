<script lang="ts">
  export let grid: number[][];
  let selR: number | null = null;
  let selC: number | null = null;

  function click(r: number, c: number) {
    selR = r;
    selC = c;
  }

  function key(e: KeyboardEvent) {
    if (selR === null || selC === null) return;
    const v = parseInt(e.key);
    if (v >= 1 && v <= 9) {
      dispatch('input', { r: selR, c: selC, v });
    }
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="board" tabindex="0" on:keydown={key}>
  {#each grid as row, r}
    <div class="row">
      {#each row as cell, c}
        <div
          class="cell {selR === r && selC === c ? 'sel' : ''}"
          on:click={() => click(r, c)}
        >
          {cell || ''}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .board {
    display: inline-block;
    border: 2px solid #000;
    padding: 4px;
    background: #000;
    outline: none;
  }
  .row { display: flex; }
  .cell {
    width: 36px; height: 36px;
    background: #fff; margin: 1px;
    display: flex; align-items: center; justify-content: center;
  }
  .sel { background: #a0d2eb; }
</style>