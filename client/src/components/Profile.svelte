<script>

    const options = ["Change your profile picture", "Change your username", "Change your profile description"]

    const uploadFile = () => {
        
    }

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
                    <form>
                        <input type="text" name="username">
                        <button type="submit">Change</button>
                    </form>
                {/if}
                {#if (option == options[2])}
                    <form>
                        <input type="text" name="description">
                        <button type="submit">Change</button>
                    </form>
                {/if}
            </div>
        {/each}
    </div>

</article>
<style></style>
