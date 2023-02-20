<script>
  import SignInMain from "./components/SignInMain.svelte";

  let signInMainOpen = false;

  const toggleSignIn = () => {
    if (signInMainOpen){
      signInMainOpen = false;
    } else {
      signInMainOpen = true;
    }
  }

  // Get cookies

  let loggedIn = false;
  let username = '';

  // Parse the "loggedIn" and "username" cookies
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  cookies.forEach(cookie => {
    const [name, value] = cookie.split('=');
    if (name === 'loggedIn') {
      loggedIn = value === 'true';
    } else if (name === 'username') {
      username = value;
    }
  });

</script>

<main>

  <div class="topbar">
    <div class="iconAndName">
      <img src="/Svelte_Logo.png" alt="Svelte logo" height=50px>
      <h1>nettside</h1>
    </div>

    {#if loggedIn}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <a href="http://localhost:5678/logout">
      <div class="openLogin">
        <p>Log out</p>
      </div>
    </a>
    {:else}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <div class="openLogin" on:click={toggleSignIn}>
      <p>Sign in / Sign up</p>
    </div>
    {/if}
  </div>

    <!-- This div will be toggled on and off-->
    <div style="positon:relative;">
        {#if signInMainOpen}
        <div class="signInMain">
            <button on:click={toggleSignIn}>Close</button>
            <div><SignInMain /></div>
            
        </div>
        {/if}
    </div>
    <!-- End of toggled div -->

    <div>
        {#if loggedIn}
            <h1>Hello, {username}</h1>
        {:else}
            <h1>You are not logged in</h1>
        {/if}

    </div>
</main>

<style>
  :root {
        --mainColor: #242424;
        --accentColor: rgb(52, 52, 52);
        --accentColor2: #fe3b00;
        --textColor: white;
    }

  .signInMain {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 1;
  }
  .signInMain > button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 2em;
  }
  .signInMain > div {
    margin-top: 5em;
  }

  .topbar {
    display: flex;
    justify-content: space-between;
    margin: 1em;
    background-color: var(--accentColor);
    margin: 0px;
    padding: 2em;
    padding-bottom: 1em;
  }

  .iconAndName {
    display: flex;
    align-items: center;
  }
  .iconAndName > * {
      margin:0px;
      margin-right: 3em;
  }

  .openLogin {
    padding-left: 1em;
    padding-right: 1em;
    background-color: var(--mainColor);
    border: 4px;
    border-style: solid;
    border-color: var(--accentColor2);
    border-radius: 1em;
  }

  a {
    text-decoration: none;
    color: var(--textColor);
  }
</style>
