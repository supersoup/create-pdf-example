const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const path = require("path");
const timeout = require('connect-timeout')

const app = express();

app.use(timeout('100s'));

app.get('/create', timeout('100s'), haltOnTimedout, function (req, res) {
	const id = req.query.id;
	axios.get('http://127.0.0.1:8084/create?id='+req.query.id)
		.then(function (content) {
			res.json({url: content.data.url})
		})
		.catch(function (e) {
			console.log('出错');
		})
});

function haltOnTimedout (req, res, next) {
	if (!req.timedout) next()
}

app.use(express.static(__dirname));

app.listen(8080, function (a) {
	console.log(a);
});