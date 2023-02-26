<script>

    const options = ["Change your profile picture", "Change your username", "Change your profile description"]

    const uploadFile = () => {
        
    }

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
<article>
    <h2>Your Profile</h2>

    <div class="optionsGrid">
        {#each options as option}
            <div>
                <p>{option}</p>
                {#if (option == options[0])}
                    <form on:submit|preventDefault={uploadFile}>
                        <input type="file" name="filename">
                        <button type="submit">Upload</button>
                    </form>
                {/if}
                {#if (option == options[1])}
                    <form action="/api/change-username" method="post">
                        <input type="text" name="newUsername" placeholder="Enter your new username">
                        <input type="text" value="{username}" readonly name="username" style="display:none;">
                        <button type="submit">Change</button>
                    </form>
                {/if}
                {#if (option == options[2])}
                    <form>
                        <textarea name="newDesctiption" cols="30" rows="10"></textarea>
                        <button type="submit">Change</button>
                    </form>
                {/if}
            </div>
        {/each}
    </div>

</article>
<style></style>
