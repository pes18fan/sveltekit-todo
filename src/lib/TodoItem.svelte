<div class="existing-todo">
    <form action="" method="">
        <input type="hidden" name="done" />
        <button aria-label="mark as done or not done" class="toggle">done/not</button>
    </form>

    <form action="" method="" class="text">
        <input type="text" />
        <button aria-label="save todo" class="save">save</button>
    </form>

    <form action="" method="">
        <button aria-label="delete todo" class="annihilate">annihilate</button>
    </form>
</div>

<style>
    .existing-todo {
        display: grid;
        grid-template-columns: 2rem 1fr 2rem;
        grid-gap: 0.5rem;
        align-items: center;
        margin: 0 0 0.5rem 0;
        padding: 0.5rem;
        background-color: white;
        border-radius: 6%;
        filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));
        transform: translate(-1px, -1px);
        transition: filter 0.2s, transform 0.2s;
    }
</style>