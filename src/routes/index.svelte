<script lang="ts">
    import TodoItem from "../lib/TodoItem.svelte";

    const title = "Todos";
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<main>
    <h1>{title}</h1>

    <form action="" method="">
        <input type="text" name="text" aria-label="add a todo" placeholder="add a todo" />
    </form>

    <TodoItem />
</main>