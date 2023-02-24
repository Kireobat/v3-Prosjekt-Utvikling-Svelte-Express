import './app.css'
import Chatrooms from './Chatroom.svelte';

const app = new Chatrooms({
    target: document.getElementById('app')
});

export default app;