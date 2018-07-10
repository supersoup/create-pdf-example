const express = require('express');
const axios = require('axios');
const HTML5ToPDF = require("html5-to-pdf");
const ejs = require('ejs');
const path = require("path");

const app = express();

const makePdf = async function (html, id) {
	const html5ToPDF = new HTML5ToPDF({
		// inputBody: html,
		inputPath: path.join(__dirname, "index2.html"),
		outputPath: path.join(__dirname, "pdfs/[普益标准]FOF投顾系统公募版组合" + id + "业绩概览.pdf"),
		include: [
			path.join(__dirname, "index.css"),
			path.join(__dirname, "echarts.js"),
			path.join(__dirname, "create.js"),
		]
	})
	
	await html5ToPDF.start()
	await html5ToPDF.build()
	await html5ToPDF.close()
};

app.get('/create', function (req, res) {
	const id = req.query.id;
	axios.get('http://127.0.0.1:8080/data?id='+req.query.id)
	.then(function (content) {
		ejs.renderFile('index.ejs', {obj: JSON.stringify(content.data), id: id}).then(function (html) {
			console.log(html);
			makePdf(html, id);
		});
		
	})
	.catch(function (e) {
		console.log(e);
	})
});



app.use(express.static(__dirname));

app.listen(80, function (a) {
	console.log(a);
});