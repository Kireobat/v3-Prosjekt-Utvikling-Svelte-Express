<script>
import Topbar from "./components/Topbar.svelte";
import Product from "./components/Product.svelte";
import { onMount } from 'svelte';

// get products

  let products = [];

  onMount(async () => {
    const res = await fetch("/api/products")
    products = await res.json();
  })

// Get cookies

let loggedIn = false;
let username = '';
let isAdmin = false;

  // Parse the "loggedIn" and "username" cookies
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  cookies.forEach(cookie => {
    const [name, value] = cookie.split('=');
    if (name === 'loggedIn') {
      loggedIn = value === 'true';
    } else if (name === 'username') {
      username = value;
    } else if (name === 'isAdmin') {
      isAdmin = value === 'true';
    }
  });
</script>

<main>
    <Topbar />

    {#if !loggedIn}
            <h1>Log in or make an account to get access to this website</h1>
    {:else}
    <h1>Welcome {username}</h1>
      {#if isAdmin}
        <div>
          <h2>Add product</h2>
          <form action="/api/add-product" method="post">
            <input type="text" name="prodName" placeholder="Product Name">
            <input type="text" name="prodDesc" placeholder="Product Description">
            <input type="number" name="prodPrice" placeholder="Product Price">
            <button type="submit">Add product</button>
          </form>
        </div>
      {/if}
      {#await products}
        <p>loading...</p>
      {:then products}
      <div class="products-grid">
        {#each products as product}
          <Product product={product} />
        {/each}
      </div>
      {/await}
    {/if}
</main>

<style>

:root {
        --mainColor: #242424;
        --accentColor: rgb(52, 52, 52);
        --accentColor2: #fe3b00;
        --textColor: white;
    }

.products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 1rem;
        margin: 1rem;
}
    
</style>