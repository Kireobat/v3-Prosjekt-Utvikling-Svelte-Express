<script>

    export let chatroom;
    export let username;


</script>

<article>

    <div class="chatroom">
        <h1>{chatroom.name}</h1>

        <p>{chatroom.desc}</p>
        <form action="/api/chatrooms/{chatroom.name}/join" method="post">
            <input type="hidden" name="username" value="{username}" />
            <button type="submit">Join</button>
        </form>
        
    </div>
</article>

<style>

    .chatroom {
        background-color: var(--accentColor);
        color: var(--textColor);
        padding: 1em;
        border-radius: 1em;
        margin: 1em;
    }

</style>