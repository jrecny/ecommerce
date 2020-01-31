const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usersRepo = require('./repositories/users');
const chalk = require('chalk');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send(`
        <div>
            <form method = "POST">
                <input name = "email"  placeholder = "email"/>   
                <input name = "password" placeholder = "password"/> 
                <input name = "passwordConfirmation" placeholder = "password confirmation"/>   
                <button>Sign Up</button>       
            </form>
        </div>
    `);
});

// bodyParser from scratch
// const bodyParser = (req, res, next) => {
// 	if (req.method === 'POST') {
// 		req.on('data', (data) => {
// 			const parsed = data.toString('utf8').split('&');
// 			const formData = {};
// 			for (let pair of parsed) {
// 				const [ key, value ] = pair.split('=');
// 				formData[key] = value;
// 			}
// 			req.body = formData;
// 			next();
// 		});
// 	} else {
// 		next();
// 	}
// };

app.post('/', async (req, res) => {
	const { email, password, passwordConfirmation } = req.body;
	const existingUser = await usersRepo.getOneBy({ email });
	if (existingUser) {
		return res.send('Email in use');
	}
	if (password !== passwordConfirmation) {
		return res.send('Passwords must match');
	}
	res.send('Account Created!');
});

app.listen(3000, () => {
	console.log(chalk.black.bgWhite('Listening on 3000'));
});
