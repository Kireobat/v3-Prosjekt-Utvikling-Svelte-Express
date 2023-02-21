<script>

const options = ["Change your password", "Change your email", "Change your phone number", "Change your payment details", "Delete me"]

</script>
<article>
    <h2>Account Settings</h2>

    <div class="optionsGrid">
        {#each options as option}
            <div>
                <p>{option}</p>
                {#if (option == options[0])}
                    <form>
                        <input type="password" name="password"><br>
                        <input type="password" name="password2"><br>
                        <button type="submit">Change</button>  
                    </form>
                {/if}
                {#if (option == options[1])}
                    <form>
                        <input type="email" name="email">
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
                    <form>
                        <button type="submit">Delete</button>  
                    </form>
                {/if}
            </div>
        {/each}
    </div>
    
</article>
<style></style>
