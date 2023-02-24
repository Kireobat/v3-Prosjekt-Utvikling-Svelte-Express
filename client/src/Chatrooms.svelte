<script>

import Topbar from "./components/Topbar.svelte";
import ChatroomList from "./components/ChatroomList.svelte";
  import { onMount } from "svelte";

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

  let newChatroom = false
  let createChatroomMenu = 'none'

  const createChatroom = () => {

    if(newChatroom == true){
      newChatroom = !newChatroom
      createChatroomMenu = 'block'
    } else {
      createChatroomMenu = 'none'
      newChatroom = !newChatroom
    }
  }

  let data = [];

  onMount(async () => {
    const res = await fetch("/api/chatrooms")
    data = await res.json();
  })

  // fetch ('/api/chatrooms')
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(JSON.stringify(data));
  //     return JSON.stringify(data)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })

</script>

<main>
  <Topbar />

  {#if !loggedIn}
            <h1>Log in or make an account to get access to this website</h1>
  {:else}

  <button on:click={createChatroom}>Make a new chatroom</button>

  <div style="display: {createChatroomMenu};">
    <form action="/create-chatroom" method="post">
      <input type="text" value="{username}" name="owner" readonly style="display:none;"/>
      <input type="text" placeholder="Chatroom name" name="name"/>
      <select name="category" placeholder="Choose category">
        <option value="general">General</option>
        <option value="tech">Tech</option>
        <option value="news">News</option>
        <option value="memes">Memes</option>
      </select>
      <input type="text" placeholder="Chatroom description" name="desc" />
      <button type="submit">Create chatroom</button>
    </form>
  </div>

  <div class="chatroomListContainer">
    {#each data as chatroom}
      <ChatroomList chatroom={chatroom} username={username}/>
    {/each}
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

.chatroomListContainer {
  display: grid;
  grid-template-columns: minmax(100px, 1fr) 1fr;
}

</style>