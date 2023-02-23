import './app.css'
import Chatrooms from './Chatrooms.svelte';

const app = new Chatrooms({
    target: document.getElementById('app')
});

export default app;