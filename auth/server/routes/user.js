const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportService = require('../services/passport');
const User = require('../models/User.js');
const cofig = require('../config');
const router = express.Router();

function tokenForUser(user) {
	const token = jwt.sign({ sub: user.id }, cofig.secretTokenString);
	return token;
}

router.post('/signup', async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(422)
			.json({ error: 'you must provide an email and password' });
	}

	try {
		const user = await User.findOne({ email });
		if (!user) {
			const newUser = await new User({ email, password }).save();
			return res.status(201).json({ token: tokenForUser(newUser) });
		}
		return res.status(422).json({ error: 'Email is in Use' });
	} catch (err) {
		return res.status(400).json({ error: 'something went wrong' });
	}
});

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.get('/', requireAuth, (req, res) => {
	res.json({ success: true });
});

router.post('/signin', requireSignin, (req, res) => {
	res.send({ token: tokenForUser(req.user) });
});

module.exports = router;
