<script>

    const options = ["Enable word filter", "Enable streamer mode", "Enable 2FA"]

</script>
<article>
    <h2>Security Settings</h2>

    <div class="optionsGrid">
        {#each options as option}
            <div>
                <p>{option}</p>
            </div>
        {/each}
    </div>
    
</article>
<style></style>
