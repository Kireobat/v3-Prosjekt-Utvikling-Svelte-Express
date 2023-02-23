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
    <h1>Hello, {username}</h1>

    <div class="nav">
      <div>
        <a href="/chatrooms">All chatrooms</a>
      </div>
      <div>
        <a href="/chatrooms">Your chatrooms</a>
      </div>
      <div>
        <a href="/chatrooms">Shop</a>
      </div><div>
        <a href="/chatrooms">Friends list</a>
      </div>
      <div>
        <a href="/chatrooms"></a>
      </div>
    </div>


  {/if}

  
</main>

<style>
  :root {
        --mainColor: #242424;
        --accentColor: rgb(52, 52, 52);
        --accentColor2: #fe3b00;
        --textColor: white;
    }
  a {
    color: var(--textColor);
    text-decoration: none;
  }
  .nav {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) 3fr;
    background-color: var(--accentColor);
  }
</style>
