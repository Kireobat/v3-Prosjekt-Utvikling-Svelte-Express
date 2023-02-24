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
      <a href="/chatrooms">
        <div>
          All chatrooms
        </div>
      </a>
      <a href="/chatrooms/joined">
        <div>
          Your chatrooms
        </div>
      </a>
      <a href="/shop">
        <div>
          Shop
        </div>
      </a>
      <a href="/friends">
        <div>
          Friends list
        </div>
      </a>
      <a href="/profile/inventory">
        <div>
          Inventory
        </div>
      </a>
    </div>

    <div class="news">
      <div>
        <h2>No news</h2>
        <p>There is no news yet...</p>
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
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    background-color: var(--accentColor);
  }
  .nav > a > div {
    padding: 10px;
    text-align: center;
    border: 1px solid var(--accentColor2);
    border-radius: 5px;
    margin: 10px;
    background-color: var(--accentColor2);
    color: var(--textColor);
    font-weight: 700;
  }
  .news {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  .news > div {
    padding: 10px;
    text-align: center;
    border: 4px solid var(--accentColor2);
    border-radius: 5px;
    margin: 10px;
    background-color: var(--mainColor);
    color: var(--textColor);
    font-weight: 700;
  }
</style>
