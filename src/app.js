/**
 * ==========================
 * ==========IMPORTS=========
 * ==========================
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const api = require('./api/api.js');

// Boilerplate code
const app = express();

const api2 = require('./api');
const { notFound, errorHandler } = require('./middlewares/errors.middleware');

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/public'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
	});
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, '../client', 'dist')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});

app.get('/shop', (req, res) => {
	res.sendFile(path.join(__dirname, '../client', 'dist', 'shop.html'));
  });

app.get('/chatrooms', (req, res) => {
	res.sendFile(path.join(__dirname, '../client', 'dist', 'chatrooms.html'));
});


/**
 * ==========================
 * ???========API=========???
 * ==========================
 */

app.post('/api/upload', (req, res) => {
	
});

app.post('/api/create-chatroom', (req, res) => {
	api.createChatroom(req, res);
})

app.get('/api/chatrooms', async (req, res) => {
	api.getChatrooms(req, res);
})

app.post('/api/chatrooms/:name/join', (req,res) =>{
	api.joinChatroom(req, res);
})

app.get('/api/chatrooms/:name', async (req, res) => {
	api.getChatroomDesc(req, res);
})

app.get('/chatrooms/:name', async (req, res) => {
	api.enterChatroom(req, res);
})

app.post('/api/change-username', (req, res) => {
	api.changeUsername(req, res);
});

app.post('/api/change-email', (req, res) => {
	api.changeEmail(req, res);
});

app.post('/api/delete-account', (req, res) => {
	api.deleteAccount(req, res);
});

app.get('/api/logout', (req, res) => {
	api.logout(req, res);
});

app.post('/api/login', (req, res) => {
	api.login(req, res);
  });

app.post('/api/register', (req, res) => {
	api.register(req, res);
});

app.get('/api/get-joined-chatrooms/:username', async (req, res) => {
	api.getJoinedChatrooms(req, res);
})

app.get('/api/chatroom/info/:name', async (req, res) => {
	api.getChatroomInfo(req, res);
});

app.get('/api/chatroom/:name/messages', async (req, res) => {
	api.getChatroomMessages(req, res);
});

app.post('/api/chatroom/send-message/:chatroom', (req, res) => {
	api.sendMessage(req, res);
});

// Boilerplate code
app.use('/api/v1', api2);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
