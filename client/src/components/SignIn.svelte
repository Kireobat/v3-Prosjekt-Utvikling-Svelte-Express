<script>

</script>

<article>
    <div class="signInDiv">
        <h1>Sign In</h1>
        <form action="http://localhost:5678/login" method="POST">
            <div class="formLine">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div class="formLine">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <div>
                <button class="signInBtn" type="submit">Sign In</button>
            </div>
        </form>
    </div>
</article>

<style>
.formLine {
    display: flex;
    justify-content: space-between;
    width: 20em;
    margin-left: 20%;
    margin-top: 0.5em;
}
.signInBtn {
    margin-top: 2em;
    margin-bottom: 1em;
}
</style>