/*
* SERVER CONFIGURATIONS
 */
require("babel-register");
const config = require('./config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const port = process.env.PORT || 3000;
const routes = require('./routes');
//================= GLOGAL FILTER =================//
router.use((req, res, next) => {
	// do logging
	console.log("Requesting: " + req.method + ' on ' + req.path);
	next(); // make sure we go to the next routes and don't stop here
});
//================= DATABASE ======================//
const mongoose = require('mongoose');
mongoose.connect(config.DB_URI, config.DB_OPTIONS);
//=================================================//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes.initialize(app, router); // Initliaze all routes
app.use('/', express.static('public'));
app.use('/create', express.static('public'));
app.use('/update/:todo_id', express.static('public'));
app.use('/view/:todo_id', express.static('public'));
app.listen(port);
//=================================================//
console.log('YOYO API Initlized at port localhost:' + port);

