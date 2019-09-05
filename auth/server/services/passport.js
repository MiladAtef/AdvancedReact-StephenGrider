const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const config = require('../config');

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function(
	email,
	password,
	done
) {
	User.findOne({ email }, function(err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false);
		}

		//compare password
		user.comparePassword(password, (err, isMatch) => {
			if (err) {
				return done(err);
			}
			if (!isMatch) {
				return done(null, false);
			}
			return done(null, user);
		});
	});
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secretTokenString
};
const jwtLogin = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
	User.findById(jwt_payload.sub, function(err, user) {
		if (err) {
			return done(err, false);
		}

		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	});
});

passport.use(localLogin);
passport.use(jwtLogin);
