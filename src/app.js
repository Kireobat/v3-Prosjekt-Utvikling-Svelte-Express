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

app.get('/', (req, res) => {
	res.status(200).json({
		message: '📦 Svelte Express Boilerplate 📦',
	});
});

app.get('/logout', (req, res) => {
	res.clearCookie('loggedIn');
	res.clearCookie('username');
	res.redirect("http://localhost:5173/");
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
  
	res.redirect("http://localhost:5173/");
  
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
  
	res.redirect("http://localhost:5173/")
  
	console.log("test")
  });
  

  dbF.All("users");

// Boilerplate code
app.use('/api/v1', api);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
