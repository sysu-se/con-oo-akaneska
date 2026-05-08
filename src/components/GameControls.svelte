<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let isWon = false;
</script>

<div class="controls">
  <button on:click={() => dispatch('undo')} disabled={isWon}>Undo</button>
  <button on:click={() => dispatch('redo')} disabled={isWon}>Redo</button>
  <button on:click={() => dispatch('reset')} disabled={isWon}>Reset</button>
</div>

<style>
  .controls {
    margin: 16px 0;
    display: flex;
    gap: 8px;
  }
  button {
    padding: 8px 12px;
    font-size: 16px;
  }
</style>