
<script>
  import { onMount } from 'svelte';
  

  export let name;
  let data;

  onMount(async () => {
    const res = await fetch("/api/chatrooms")
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
<!-- Display the chatroom data -->
<h1>{name.name}</h1>
<p>{name.description}</p>
</main>
<style>

</style>