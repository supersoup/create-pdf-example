//后端的数据接口服务器
const express = require('express');
const app = express();

app.get('/data', function (req, res) {
	console.log(req.query);
	res.json({
		id: req.query.id,
		x: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
		y: [5, 20, 36, 10, 10, 20]
	})
});


app.listen(8080, function (a) {
	console.log(a);
});