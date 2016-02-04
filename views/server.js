/**
 * 及时竞拍推送服务器
 */

//console.log(__dirname)	

var app = require('express')();

var server = require('http').createServer(app);

var c = require('./libs/log');

var socket = require('./libs/socket').init(server);

require('./libs/amqp').init();

var conf = require('./config/config');

var port = conf.SOCKET_PORT

app.get('/',function(req,res){
	res.send("{'status':'404','msg':'error'}")
	
})

app.get('/count',function(req,res){
	var count = socket.statistic();
	res.send(count);
})
/**
 * 开启监听端口
 */
server.listen(port, function() {
	c.log("成功启动" + port + "端口，当前目录" + __dirname);
});


