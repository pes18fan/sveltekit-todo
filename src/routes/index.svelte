<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";
    import { enhance } from "$lib/actions/form";

    export const load: Load = async ({ fetch }) => {
        const res = await fetch("/todos.json");

        if (res.ok) {
            const todos = await res.json();
            return {
                props: { todos },
            };
        }

        const { message } = await res.json();
        return {
            error: new Error(message),
        };
    };

</script>

<script lang="ts">
    import TodoItem from "../lib/TodoItem.svelte";

    export let todos: Todo[];

    const title = "Todos";

    async function processNewTodoResult(response: Response, form: HTMLFormElement) {
        let newTodo = await response.json(); // returns all the todos
        newTodo = newTodo[newTodo.length - 1]; // take the most recently added i.e. last todo
        todos = [...todos, newTodo];

        form.reset();
    }

    async function processUpdatedTodoResult(response: Response) {
        const updatedTodo = await response.json();
        todos = todos.map(t => {
            if (t.uid === updatedTodo.uid) {
                return updatedTodo;
            }
        })
    }
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="todos">
    <h1>{title}</h1>

    <form action="/todos.json" method="post" class="new" use:enhance={{
        result: processNewTodoResult
    }}>
        <input
            type="text"
            name="text"
            aria-label="add a todo"
            placeholder="+ add a todo"
        />
    </form>

    {#each todos as todo}
        <TodoItem 
            {todo}
            processDeletedTodoResult={() => {
                todos = todos.filter(t => t.uid !== todo.uid);
            }}
            {processUpdatedTodoResult}
        />
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
            width: 80%;
            color: rgb(235, 235, 235);
            padding: 0.5em 1em 0.5em 1em;
            box-sizing: border-box;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6%;
            text-align: center;
        }

        ::placeholder {
            color: rgb(175, 175, 175);
            opacity: 1;
        }
    }
</style>
