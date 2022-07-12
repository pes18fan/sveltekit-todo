<script lang="ts">
    import TodoItem from "../lib/TodoItem.svelte";

    const title = "Todos";
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="todos">
    <h1>{title}</h1>

    <form action="" method="" class="new">
        <input
            type="text"
            name="text"
            aria-label="add a todo"
            placeholder="add a todo"
        />
    </form>

    <TodoItem />
    <TodoItem />
    <TodoItem />
</div>

<style lang="scss">
    .todos {
        width: 100%;
        max-width: 42rem;
        margin: 4rem auto 0 auto;

        :global(input) {
            border: 1px solid transparent;
        }

		:global(input:focus-visible) {
			transition: all 200ms ease;
            box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
            border: 1px solid transparent !important;
            outline: none;
        }
    }

    .new {
        margin: 0 0 1rem 0;

        input {
            font-size: 16px;
            width: 100%;
            padding: 0.5em 1em 0.5em 1em;
            box-sizing: border-box;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6%;
            text-align: center;
        }
    }
</style>
