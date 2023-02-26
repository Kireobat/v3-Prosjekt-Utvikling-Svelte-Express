<script>
  import { prevent_default } from "svelte/internal";
    
const options = ["Change your password", "Change your email", "Change your phone number", "Change your payment details", "Delete me"]

let promtDelete = false;

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
    <h2>Account Settings</h2>

    <div class="optionsGrid">
        {#if (promtDelete)}
            <div>
                <p>Are you sure you want to delete your account "<span style="font-weight: 700;">{username}</span>"?</p>
                <div style="display:flex; justify-content:space-evenly;">
                <form action="http://localhost:5678/api/delete-account" method="POST">
                    <input type="text" value="{username}" readonly name="username" style="display:none;">
                    <button type="submit" style="background-color: red;">Yes</button>  
                </form>
                <form>
                    <button type="submit" on:click={prevent_default(() => promtDelete = false)}>No</button>  
                </form>
                </div>
            </div>
        {:else}
        {#each options as option}
            <div class="optionDiv">
                {#if (option !== options[4])}
                    <p>{option}</p>
                {/if}
                {#if (option == options[0])}
                    <form>
                        <input type="password" name="password"><br>
                        <input type="password" name="password2"><br>
                        <button type="submit">Change</button>  
                    </form>
                {/if}
                {#if (option == options[1])}
                    <form action="/api/change-email" method="post">
                        <input type="text" value="{username}" readonly name="username" style="display:none;">
                        <input type="email" name="newEmail" placeholder="Enter your new email">
                        <button type="submit">Change</button>  
                    </form>
                {/if}
                {#if (option == options[2])}
                    <form>
                        <input type="tel" name="phone">
                        <button type="submit">Change</button>  
                    </form>
                {/if}
                {#if (option == options[3])}
                    <form>
                        <input type="text" name="cardNumber" placeholder="Enter Card Number"><br>
                        <input type="text" name="expDate" placeholder="Enter Expiration Date"><br>
                        <input type="text" name="cvv" placeholder="Enter CVV"><br>
                        <button type="submit">Change</button>  
                    </form>
                {/if}
                {#if (option == options[4])}                
                    <button class="delBtn" on:click={() => promtDelete = true}>Delete your account</button>    
                {/if}
            </div>
        {/each}
        {/if}
    </div>
    
</article>
<style>
    .optionDiv {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 2em;
    }
    .delBtn {
        background-color: #ff0000;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 0.5em 1em;
        font-size: 1.2em;
    }
</style>
