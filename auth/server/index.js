const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User');

mongoose
	.connect('mongodb://localhost:27017/auth-demo', {
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => console.log('MongoDB Connection Succeeded.'))
	.catch(err => console.log('Error in DB connection: ' + err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// routes
app.use(require('./routes/user'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
