const path = require('path');
const hashing = require('../hashing.js');
const dbF = require('../dbFunctions.js');
const sqlite3 = require('better-sqlite3');
const db = sqlite3('database.db', {verbose: console.log});

const changeUsername = (req, res) => {
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
	res.redirect("/")
}

const changeEmail = (req, res) => {
    console.log("Changing email")

	let data = req.body;

	let userToChange = data.username;

	console.log("New email: "+ data.newEmail)

	if (JSON.stringify(dbF.allInColumn("users","email")).includes(data.newEmail)) {
		return res.status(400).json({message: "Email already in use"})
	}

	dbF.update("users", "username", userToChange, "email", data.newEmail);

	res.redirect("/")
};

const deleteAccount = (req, res) => {
    console.log("Deleting account")

	let data = req.body;

	let userToDelete = data.username;

	console.log("Username: "+ userToDelete)

	dbF.Delete("users", "username", userToDelete);

	res.clearCookie('loggedIn');
	res.clearCookie('username');

	res.redirect("/")
}

const logout = (req, res) => {
    res.clearCookie('loggedIn');
	res.clearCookie('username');
	res.redirect("/");
}

const login = (req, res) => {
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

  
	res.redirect("/");
  
	return;
}

const register = (req, res) => {
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
  
	res.redirect("/")
}

const getChatroomDesc = async (req, res) => {
    try {
		const {name} = req.params;
		let statment = db.prepare("SELECT desc FROM chatrooms WHERE name = ?");
		desc = statment.get(name);
		res.json(desc);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server error')
	}
}

const getChatrooms = async (req, res) => {
    try {
		const chatrooms = await dbF.multipleAllInColumn("chatrooms", ["name","desc"]);
		res.json(chatrooms);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server error')
	}
}

const createChatroom = (req, res) => {
    let data = req.body;

	if (data.name == "") {
		return res.status(400).json({message: "Please provide a name for the chatroom"})
	}
	if (data.desc == "") {
		return res.status(400).json({message: "Please provide a description for the chatroom"})
	}

	if (JSON.stringify(dbF.allInColumn("chatrooms","name")).includes(data.name)) {
		return res.status(400).json({message: "Chatroom already exists"})
	}

	dbF.multipleInsert("chatrooms", ["name", "desc"], [data.name, data.desc]);

	let statment = db.prepare("SELECT id FROM chatrooms WHERE name = ?");
	chatroomId = statment.get(data.name);
	console.log(chatroomId)

	statment = db.prepare("SELECT id FROM categories WHERE category = ?")
	categoryId = statment.get(data.category);
	console.log(categoryId)

	dbF.multipleInsert("CategoryToChatroom", ["category_id","chatroom_id"], [categoryId.id, chatroomId.id])

	dbF.multipleInsert("chatrooms", ["name", "desc"], [data.name, data.desc]);

	res.redirect("/chatrooms/"+data.name)
}

const joinChatroom = (req, res) => {
    const {name} = req.params;
	const {username} = req.body;

	let statment = db.prepare("SELECT id FROM chatrooms WHERE name = ?");
	chatroomId = statment.get(name);
	console.log(name)
	console.log(chatroomId)

	statment = db.prepare("SELECT id FROM users WHERE username = ?")
	userId = statment.get(username);

	dbF.multipleInsert("user_chatrooms", ["user_id","chatroom_id"], [userId.id, chatroomId.id])

	res.redirect('/chatrooms/'+name)
}

const enterChatroom = async (req, res) => {
    const name = req.params.name;

    if (name === "joined") {
        res.sendFile(path.join(__dirname, '..','../client', 'dist', 'joined.html'));

        console.log("joined html sent")
    } else if (name ==="undefined"){
		res.status(400).send("Seems like you encountered an error. I dont know what caused it.")

	} else {

	res.cookie('chatroom', name);
	
	res.sendFile(path.join(__dirname, '..','../client', 'dist', 'chatroom.html'));

    }

    console.log("User entered chatroom: "+name)
}

const upload = (req, res) => {
    console.log(req.query.filename);

	res.redirect("/")
}

const getJoinedChatrooms = async (req, res) => {
	try {
		const {username} = req.params;

		// get user id
		let statment = db.prepare("SELECT id FROM users WHERE username = ?");
		userId = statment.get(username);
		console.log(userId)

		// get chatroom ids
		statment = db.prepare("SELECT chatroom_id FROM user_chatrooms WHERE user_id = ?");
		chatroomIds = statment.all(userId.id);
		console.log(chatroomIds)


		// get chatroom names from user and chatroom ids
		let chatrooms = [];

		for (let i = 0; i < chatroomIds.length; i++) {
			statment = db.prepare("SELECT name FROM chatrooms WHERE id = ?");
			chatroom = statment.get(chatroomIds[i].chatroom_id);
			chatrooms.push(chatroom.name);
		}
		res.json(chatrooms);

	} catch (err) {
		console.log(err);
		res.status(500).send('Server error')
	}
}

const getChatroomInfo = async (req, res) => {
	try {
		const chatroom = req.params;

		const name = chatroom.name;

		console.log(name)


		

		// get chatroom id
		statment = db.prepare("SELECT id FROM chatrooms WHERE name = ?");
		chatroomId = statment.get(name);
		console.log("chatroom id: "+chatroomId.id)

		//get chatroom description
		statment = db.prepare("SELECT desc FROM chatrooms WHERE id = ?");
		desc = statment.get(chatroomId.id);
		console.log("chatroom desc: "+JSON.stringify(desc))

		// get messages
		statment = db.prepare("SELECT * FROM messages WHERE chatroom_id = ?");
		messages = statment.all(chatroomId.id);
		console.log("messages: "+messages)

		
		

		// get users that are in the chatroom
		statment = db.prepare("SELECT user_id FROM user_chatrooms WHERE chatroom_id = ?");
		userIds = statment.all(chatroomId.id);
		console.log(userIds)

		// get usernames from user ids
		let users = [];
		statment = db.prepare("SELECT username FROM users WHERE id = ?");
		for (let i = 0; i < userIds.length; i++) {
			user = statment.get(userIds[i].user_id);
			users.push(user.username);
		}
		console.log(users)

		// get categories
		statment = db.prepare("SELECT category_id FROM CategoryToChatroom WHERE chatroom_id = ?");
		categoryIds = statment.all(chatroomId.id);
		console.log(categoryIds)

		// get category names from category ids
		let categories = [];
		statment = db.prepare("SELECT category FROM categories WHERE id = ?");
		for (let i = 0; i < categoryIds.length; i++) {
			category = statment.get(categoryIds[i].category_id);
			categories.push(category.category);
		}
		console.log(categories)

		res.json({desc, messages: messages, users: users, categories: categories});
	} catch (err) {
		console.log(err);
		res.status(500).send('Server error')
	}
};

const getChatroomMessages = async (req, res) => {
	try {
		const {chatroom} = req.params;
		
		let statment = db.prepare("SELECT * FROM messages WHERE chatroom = ?");
		messages = statment.all(chatroom);
		console.log(messages)

		res.json(messages);
	} catch (err) {
		console.log(err);
		res.status(500).send('Server error')
	}
}

const sendMessage = async (req, res) => {
	try {
		const {username, message} = req.body;
		const {chatroom} = req.params;

		let statment = db.prepare("SELECT id FROM users WHERE username = ?");
		userId = statment.get(username);
		console.log(userId)

		statment = db.prepare("SELECT id FROM chatrooms WHERE name = ?");
		chatroomId = statment.get(chatroom);
		console.log(chatroomId)

		let date = Date.now();

		statment = db.prepare("INSERT INTO messages (user_id, chatroom_id, message, timestamp) VALUES (?, ?, ?, ?)");

		statment.run(userId.id, chatroomId.id, message, date);

		res.json({message: "Message sent"});
	} catch (err) {
		console.log(err);
		res.status(500).send('Server error')
	}
}



exports.changeUsername = changeUsername;
exports.changeEmail = changeEmail;
exports.deleteAccount = deleteAccount;
exports.logout = logout;
exports.login = login;
exports.register = register;
exports.getChatroomDesc = getChatroomDesc;
exports.getChatrooms = getChatrooms;
exports.createChatroom = createChatroom;
exports.joinChatroom = joinChatroom;
exports.enterChatroom = enterChatroom;
exports.upload = upload;
exports.getJoinedChatrooms = getJoinedChatrooms;
exports.getChatroomInfo = getChatroomInfo;
exports.getChatroomMessages = getChatroomMessages;
exports.sendMessage = sendMessage;
