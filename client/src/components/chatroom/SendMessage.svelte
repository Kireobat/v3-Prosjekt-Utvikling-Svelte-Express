<script>
  export let username;
  export let chatroom;
</script>

<article>
  <form action="/api/chatroom/send-message/{chatroom}" method="post">
    <input type="hidden" value={username} name="username" />
    <input
      type="text"
      placeholder="Message {chatroom}"
      name="message"
      id="message"
    />
    <button type="submit" id="submit">Send</button>
  </form>
</article>

<style>
  form {
    display: flex;
  }
  #message {
    width: 50vw;
  }
</style>
