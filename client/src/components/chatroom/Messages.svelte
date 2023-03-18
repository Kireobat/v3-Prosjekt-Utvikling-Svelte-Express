<script>
  export let message;
</script>

<article>
  <div class="message">
    <div class="usernamearea">
      <h3>{message.user_id}</h3>
    </div>
    <div class="timestamparea">
      <p>{message.timestamp}</p>
    </div>
    <div class="messagearea">
      <p>{message.message}</p>
    </div>
  </div>
</article>

<style>
  .message {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(7, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  .usernamearea {
    grid-area: 1 / 1 / 3 / 3;
  }
  .timestamparea {
    grid-area: 1 / 4 / 3 / 5;
  }
  .messagearea {
    grid-area: 3 / 1 / 8 / 11;
  }
</style>
