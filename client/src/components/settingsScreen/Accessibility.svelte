<script>

const options = ["Change your color scheme", "Change your font size", "Change your language", "Enable text to speech", "Enable high contrast"]

</script>
<article>
    <h2>Accessibility Settings</h2>
    
    <div class="optionsGrid">
        {#each options as option}
            <div>
                <p>{option}</p>
                {#if (option == options[3] || option == options[4])}
                    <form>
                        <label class="switch">
                            <input type="checkbox">
                            <span class="slider round"></span>
                        </label>
                    </form>
                {/if}
                {#if (option == options[0])}
                    <form>
                        <select name="colorScheme">
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                        </select>
                    </form>
                {/if}
                {#if (option == options[1])}
                    <form>
                        <select name="fontSize">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </form>
                {/if}
                {#if (option == options[2])}
                    <form>
                        <select name="language">
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="french">French</option>
                        </select>
                    </form>
                {/if}
            </div>
        {/each}
    </div>

</article>
<style>

    /* The switch - the box around the slider */
    .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
} 
</style>
