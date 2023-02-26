<script>

</script>

<article>
    <div class="signUpDiv">
        <h1>Sign Up</h1>
        <form  action="/api/register" method="POST">
            <div class="formLine">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" maxlength="16" placeholder="Max 16 characters"/>
            </div>
            <div class="formLine">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div class="formLine">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <div class="formLine">
                <label for="password2">Confirm Password</label>
                <input type="password" name="password2" id="password2" />
            </div>
            <div>
                <button class="signInBtn" type="submit">Sign Up</button>
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