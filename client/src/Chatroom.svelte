
<script>
  import { onMount } from 'svelte';
  
  let data = {};
  
  //get data for chatroom based on cookie

  let loggedIn = false;
  let username = '';
  let chatroom = '';

onMount(async () => {

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

    const res = await fetch("/api/chatroom/info/"+chatroom)
    data = await res.json();

    console.log(data)
  })
  
</script>
<main>
  {#await data}
    <p>loading...</p>
  {:then}
  <p>data loaded</p>
    <h1>{chatroom}</h1>
    <p>{data.desc}</p>
    <h2>Members</h2>
    <ul>
      {#if data.desc && data.users}
        {#each data.users as member}
          <li>{member}</li>
        {/each}
      {:else}
        <p>No members in chatroom</p>
      {/if}
    </ul>
    <h2>{data.messages}</h2>

    <form action="/api/chatroom/send-message/{chatroom}" method="post">
      <input type="hidden" value="{username}" name="username">
      <input type="text" placeholder="Message" name="message" maxlength="280"/>
      <button type="submit">Send</button>
    </form>
  {/await}
</main>
<style>

</style>