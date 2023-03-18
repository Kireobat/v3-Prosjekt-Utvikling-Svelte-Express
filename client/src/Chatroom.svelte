<script>
  import { onMount } from "svelte";
  import Topbar from "./components/Topbar.svelte";
  import Message from "./components/chatroom/Messages.svelte";
  import ChatroomInfo from "./components/chatroom/ChatroomInfo.svelte";
  import SendMessage from "./components/chatroom/SendMessage.svelte";

  let data = {};

  //get data for chatroom based on cookie

  let loggedIn = false;
  let username = "";
  let chatroom = "";

  onMount(async () => {
    // Parse the "loggedIn" and "username" cookies
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      if (name === "loggedIn") {
        loggedIn = value === "true";
      } else if (name === "username") {
        username = value;
      } else if (name === "chatroom") {
        chatroom = value;
      }
    });

    const res = await fetch("/api/chatroom/info/" + chatroom);
    data = await res.json();
    data.userCount = data.users.length;

    console.log(data);
  });
</script>

<main>
  <Topbar />
  {#if data}
    <div class="parent">
      <div class="messagesDiv">
        {#if data.desc && data.messages}
          {#each data.messages as message}
            <Message {message} />
          {/each}
        {/if}
      </div>

      <div class="infoDiv">
        <ChatroomInfo {data} />
      </div>

      <div class="sendMessageDiv" />
      <SendMessage {username} {chatroom} />
    </div>
  {:else}
    <h1>Chatroom not found</h1>
  {/if}
</main>

<style>
  :root {
    --mainColor: #242424;
    --accentColor: rgb(52, 52, 52);
    --accentColor2: #fe3b00;
    --textColor: white;
  }

  .parent {
    height: 88.3vh;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(7, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  .messagesDiv {
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: var(--accentColor);
    grid-area: 1 / 1 / 7 / 8;
  }
  .infoDiv {
    grid-area: 1 / 8 / 8 / 11;
  }
  .sendMessageDiv {
    background-color: var(--accentColor);
    grid-area: 8 / 1 / 8 / 8;
  }
</style>
