/**
 * ==========================
 * ==========IMPORTS=========
 * ==========================
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const hashing = require('./hashing.js');
const dbF = require('./dbFunctions.js');
const sqlite3 = require('better-sqlite3');
const db = sqlite3('database.db', {verbose: console.log});

// Boilerplate code
const app = express();

const api = require('./api');
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

// Routing and Handlers

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



app.post('/upload', (req, res) => {
	console.log(req.query.filename);

	res.redirect("http://localhost:5678/")
});

// CHANGE INFO

app.post('/change-username', (req, res) => {
	console.log("Changing username")

	let data = req.body;

	let userToChange = data.username;

	console.log("New username: "+ data.newUsername)

	if (JSON.stringify(dbF.allInColumn("users","username")).includes(data.newUsername)) {
		return res.status(400).json({message: "Username already in use"})
	  }

	dbF.update("users", "username", userToChange, "username", data.newUsername);

	res.clearCookie('username');
	res.cookie('username', data.newUsername);
	res.redirect("http://localhost:5678/")
});

app.post('/change-email', (req, res) => {
	console.log("Changing email")

	let data = req.body;

	let userToChange = data.username;

	console.log("New email: "+ data.newEmail)

	if (JSON.stringify(dbF.allInColumn("users","email")).includes(data.newEmail)) {
		return res.status(400).json({message: "Email already in use"})
	}

	dbF.update("users", "username", userToChange, "email", data.newEmail);

	res.redirect("http://localhost:5678/")
});

app.post('/delete-account', (req, res) => {
	console.log("Deleting account")

	let data = req.body;

	let userToDelete = data.username;

	console.log("Username: "+ userToDelete)

	dbF.Delete("users", "username", userToDelete);

	res.clearCookie('loggedIn');
	res.clearCookie('username');

	res.redirect("http://localhost:5678/")
});

app.get('/logout', (req, res) => {
	res.clearCookie('loggedIn');
	res.clearCookie('username');
	res.redirect("http://localhost:5678/");
});

app.post('/login', (req, res) => {

	console.log("User logging in")

	// info submitted by user
	const { email, password } = req.body;
  
	// info from database
	let dbEmail = dbF.allInColumn("users", "email");
  
	if (!JSON.stringify(dbEmail).includes(email)){
		return res.status(400).json({message: "Email or password is wrong"})
	  }
	let statment = db.prepare("SELECT password FROM users WHERE email = ?");
	let dbPass = statment.get(email); // gets password from db
  
	statment = db.prepare("SELECT salt FROM users WHERE email = ?");
	let salt = statment.get(email); // gets password from db
  
	console.log("Password from db: "+dbPass.password)
	console.log("Password from user: "+hashing.hashString(password, salt))
  
	// compare password
	if (!hashing.compareHash(password, dbPass.password)) {
	  return res.status(400).json({message: "Email or password is wrong"})
	}
	
	statment = db.prepare("SELECT username FROM users WHERE email = ?");
	let username = statment.get(email); // gets password from db
  
	console.log("username: "+ username.username);

	res.cookie('loggedIn', true);
	res.cookie('username', username.username);

	let isAdmin;

	statment = db.prepare("SELECT isAdmin FROM users WHERE email = ?");
	isAdmin = statment.get(email); // checks if user is admin

	if (isAdmin.isAdmin == 1) {
		res.cookie('isAdmin', true);
	}

  
	res.redirect("http://localhost:5678/");
  
	return;
  
  });

  //------------------------------------------------

  app.post('/register', (req, res) => {

	console.log("User registering")
  
	// info submitted by user
	const { username, email, password, password2 } = req.body;
  
	// check if all fields are filled and valid
  
	if (username == "" || email == "" || password == "") {
	  return res.status(400).json({message: "Please provide a username, email and password"})
	}
  
	if (JSON.stringify(dbF.allInColumn("users","email")).includes(email)) {
	  return res.status(400).json({message: "Email already in use"})
	}
  
	if (JSON.stringify(dbF.allInColumn("users","username")).includes(username)) {
	  return res.status(400).json({message: "Username already in use"})
	}
  
	if (password != password2) {
	  return res.status(400).json({message: "Passwords do not match"})
	}
  
	let hashResult = hashing.hashString(password);
	let hashedPass = hashResult.hash;
	let salt = hashResult.salt;
  
	dbF.multipleInsert("users", ["username", "email", "password", "salt"], [username, email, hashedPass, salt]);
  
	res.cookie('loggedIn', true);
	res.cookie('username', username.username);
  
	res.redirect("http://localhost:5678/")
  
	console.log("test")
  });
  

  dbF.All("users");

// Boilerplate code
app.use('/api/v1', api);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
