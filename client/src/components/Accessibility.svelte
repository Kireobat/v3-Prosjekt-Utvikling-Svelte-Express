<script>

const options = ["Change your color scheme", "Change your font size", "Change your language", "Enable text to speech", "Enable high contrast"]

</script>
<article>
    <h2>Accessibility Settings</h2>
    
    <div class="optionsGrid">
        {#each options as option}
            <div>
                <p>{option}</p>
            </div>
        {/each}
    </div>

</article>
<style></style>
