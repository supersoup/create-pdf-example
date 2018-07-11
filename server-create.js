const express = require('express');
const axios = require('axios');
const HTML5ToPDF = require("html5-to-pdf");
const ejs = require('ejs');
const path = require("path");
const timeout = require('connect-timeout')

const app = express();

const makePdf = async function (html, id, res) {
	let time1 = (new Date()).getTime();
	const html5ToPDF = new HTML5ToPDF({
		inputBody: html,
		// inputPath: path.join(__dirname, "template/index2.html"),
		outputPath: path.join(__dirname, "pdfs/fof" + id + ".pdf"),
		include: [
			path.join(__dirname, "template/index.css"),
			path.join(__dirname, "template/echarts.js"),
			path.join(__dirname, "template/create.js"),
		]
	})
	
	await html5ToPDF.start()
	await html5ToPDF.build()
	await html5ToPDF.close()
	let time2 = (new Date()).getTime();
	console.log("DONE:" + (time2 - time1))
	
	res.json({url: "/pdfs/fof" + id + ".pdf"})
};

app.get('/create', function (req, res) {
	const id = req.query.id;
	console.log(id);
	axios.get('http://127.0.0.1:8083/data')
	.then(function (content) {
		console.log(content.data);
		ejs.renderFile(path.resolve(__dirname, 'template/index.ejs'), {obj: JSON.stringify(content.data), id: id}).then(function (html) {
			console.log(html);
			makePdf(html, id, res);
		});
	})
	.catch(function (e) {
		console.log('出错');
		console.log(e);
	})
});

function haltOnTimedout (req, res, next) {
	if (!req.timedout) next()
}

app.listen(8084, function (a) {
	console.log(a);
});