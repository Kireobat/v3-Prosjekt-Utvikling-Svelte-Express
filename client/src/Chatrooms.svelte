<script>

import Topbar from "./components/Topbar.svelte";

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
    <Topbar />

    {#if !loggedIn}
            <h1>Log in or make an account to get access to this website</h1>
    {:else}
    <p>Here you can buy some stuff</p>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
    {/if}

</main>

<style>

:root {
        --mainColor: #242424;
        --accentColor: rgb(52, 52, 52);
        --accentColor2: #fe3b00;
        --textColor: white;
    }

</style>