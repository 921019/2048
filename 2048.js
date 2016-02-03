
/**
 * @author dongdong
 * @date 2016 2 5
 */

var express 	= require('express');
var app 		= express();
var path 		= require('path');


//静态文件目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/',function(req,res){
	
	var result = {
		cate :"138",
		list :[{
			Pid	 	: "123123",
			EndTime	: "2016-13-12",
			StartPrice: "12",  //起拍价
			DqPrice	: "12313", //当前价
			IsTop     : "1",
			IsDelay   : "0"
		},
		{
			Pid	 	: "123123",
			EndTime	: "2016-13-12",
			StartPrice: "12",  //起拍价
			DqPrice	: "12313", //当前价
			IsTop     : "1",
			IsDelay   : "0"
		}]
	};
	
	res.render('2' , {
		items: result
	})
})


app.listen('2500',function(){
	console.log("端口监听成功")
})


    


//去redis中取出最后一个拍品,每次取出的时候 写入一条日志

