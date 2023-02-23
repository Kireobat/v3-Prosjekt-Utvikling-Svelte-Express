<script>
    import SignIn from "./SignIn.svelte";
    import SignUp from "./SignUp.svelte";

    let signInOpen = true;

    const signInToggle = () => {
        if (signInOpen) {
            signInOpen = false
            
        } else {
            signInOpen = true
        }
    }

</script>

<article>
    <div class="signInMainDiv">
        <div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <a on:click={signInToggle} class="signIn">Sign In</a>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <a on:click={signInToggle} class="signUp">Sign Up</a>
        </div>
        {#if signInOpen}
            <SignIn />
        {:else}
            <SignUp />
        {/if}
    </div>
</article>

<style>
    :root {
        --mainColor: #242424;
        --accentColor: rgb(52, 52, 52);
        --textColor: white;
    }

    .signInMainDiv {
        background-color: var(--mainColor);
        margin: 0 auto;
        border: 0.4em;
        border-color: var(--accentColor);
        border-style: solid;
        border-radius: 1em;
        width: 60vw;
    }
    .signInMainDiv > div {
        display: flex;
        justify-content: space-around;
        background-color: var(--accentColor);
        width: 60vw;
        padding-bottom: 0.5em;
    }
    .signInMainDiv > div > a {
        text-decoration: none;
        color: var(--textColor);
        font-size: 1em;
    }
</style>