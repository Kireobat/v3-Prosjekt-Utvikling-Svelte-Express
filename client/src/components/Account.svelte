<script>

const options = ["Change your password", "Change your email", "Change your phone number", "Change your payment details", "Delete me"]

</script>
<article>
    <h2>Account Settings</h2>

    <div class="optionsGrid">
        {#each options as option}
            <div>
                <p>{option}</p>
            </div>
        {/each}
    </div>
    
</article>
<style></style>
