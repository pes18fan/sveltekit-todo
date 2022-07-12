<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit"

    export const load: Load = async ({ fetch }) => {
        const res = await fetch("/todos.json");

        if (res.ok) {
            const todos = await res.json();
            return {
                props: { todos }
            }
        }

        const { message } = await res.json();
        return {
            error: new Error(message)
        }
    }
</script>

<script lang="ts">
    import TodoItem from "../lib/TodoItem.svelte";

    export let todos: Todo[];

    const title = "Todos";
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="todos">
    <h1>{title}</h1>

    <form action="/todos.json" method="post" class="new">
        <input
            type="text"
            name="text"
            aria-label="add a todo"
            placeholder="add a todo"
        />
    </form>

    {#each todos as todo}
        <TodoItem />
    {/each}
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
