<script lang="ts">
    import TodoItem from "../lib/TodoItem.svelte";

    const title = "Todos";
</script>

<style>
</style>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<form action="" method="">
    <input
        type="text"
        name="text"
        aria-label="add a todo"
        placeholder="add a todo"
    />
</form>
