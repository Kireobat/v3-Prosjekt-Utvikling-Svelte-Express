
<script>
  import { onMount } from 'svelte';
  
  let data = [];

  onMount(async () => {
    const res = await fetch("/api/get-joined-chatrooms/"+username)
    data = await res.json();
  })

  let loggedIn = false;
  let username = '';
  let chatroom = '';

  // Parse the "loggedIn" and "username" cookies
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  cookies.forEach(cookie => {
    const [name, value] = cookie.split('=');
    if (name === 'loggedIn') {
      loggedIn = value === 'true';
    } else if (name === 'username') {
      username = value;
    } else if (name === 'chatroom') {
      chatroom = value;
    }
  });

</script>
<main>
<h1>List of joined chatrooms</h1>
{#await data}
  <p>loading...</p>
{:then data}
  {#each data as chatroom}
    <div>
      <a href="/chatrooms/{chatroom}">{chatroom}</a>
    </div>
  {/each}
{/await}


</main>
<style>

</style>