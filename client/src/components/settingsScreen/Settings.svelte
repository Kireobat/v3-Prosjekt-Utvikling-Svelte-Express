<script>
    import Profile from "./Profile.svelte";
    import Accessibility from "./Accessibility.svelte";
    import Security from "./Security.svelte";
    import Account from "./Account.svelte";
    import Notifications from "./Notifications.svelte";

    const items = ["Profile", "Account", "Security", "Accessibility", "Notifications"]

    let activePage = "Account";

    const changePage = (e) => {
        activePage = e.target.innerHTML;
    }

</script>

<article>
    <div class="signInMainDiv">
        <div class="menu">
            <div class="itemList">
                {#each items as item}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <h2 class="item {item}" on:click={changePage}>{item}</h2>
            
                {/each}
            
            </div>
        </div>
        <div class="details">
            {#if activePage === "Profile" }
                <Profile />
            {:else if activePage === "Account" }
                <Account />
            {:else if activePage === "Security" }
                <Security />
            {:else if activePage === "Accessibility" }
                <Accessibility />
            {:else if activePage === "Notifications" }
                <Notifications />
            {/if}
            
        </div>
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
        width: 80vw;


        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }

        .menu { grid-area: 1 / 1 / 6 / 3; }
        .details { grid-area: 1 / 3 / 6 / 7; }


        .itemList {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }

        .item {
            margin-top: 2em;
            margin-bottom: 2em;
        }
</style>