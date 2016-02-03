/**
 * 竞拍操作类
 * @author midong 2015-12-2 14:01
 * $host 主机
 */
(function(){
	var d = document,
	    w = window,
	    price = 0,
	    bc = 10,
		that,
		group,
		username,
//	    host="http://192.168.1.138:8080";
	    host="http://127.0.0.1:8080";
		//对象client
		w.client = {
			socket:null,
			/**
			 * 加入房间
			 */
			joinBid:function(){
				groupid = document.getElementById("groupid").value;
				username = document.getElementById("username").value;
				if(groupid==''){
					alert('请选择房间ID');
					return;
				}
				if(username==''){
					alert('请填写昵称');
					return;
				}
				
				group = groupid;
				price = price+bc
				var data = {group:group,price:price,username:username}
				that.socket.emit('group',data);
			},
			/**
			 * 出价
			 */
			subBid:function(){
				username = username;
				price = price+bc;
				var data={price:price,group:group,username:username}
				this.socket.emit('offer',data);
			},
			/**
			 * 初始化 加入的用户ID 和用户name
			 * @param {Object} uid
			 * @param {Object} uname
			 */
			init:function(){
				
				that=this;
				//链接
				that.socket = io.connect(host); 
				
				/**
				 * 自己加入分组成功
				 */
				that.socket.on('groupok',function(e){
					price = e.price;
					var h = document.getElementById("offer-room").innerHTML;
					var html = "当前出价:"+e.price
					document.getElementById("offer-room").innerHTML = h+"<br/>"+html
					
					//当前最高价,出价人
					document.getElementById("height").innerHTML = "最高价："+e.price+"----出价人："+e.username
				})
				
				/**
				 * 告诉其他人我已经加入分组
				 */
				that.socket.on('othergroupok',function(e){
					var h = document.getElementById("room").innerHTML;
					var html = "用户"+e.username+"加入房间";
					document.getElementById("room").innerHTML = h+"<br/>"+html
				})
				
				/**
				 * 刷新出价信息
				 */
				that.socket.on('offer',function(e){
					price = e.price;
					var h = document.getElementById("offer-room").innerHTML;
					var html = e.username+"----当前出价:"+price
					document.getElementById("offer-room").innerHTML = h+"<br/>"+html
					document.getElementById("offer-room").scrollTop = document.getElementById("offer-room").scrollHeight;
					
					//当前最高价,出价人
					document.getElementById("height").innerHTML = "最高价："+e.price+"----出价人："+e.username
				})
				
				//点击出价按钮触发出价事件
				d.getElementById("offer").addEventListener('click',function(){
					that.subBid();
				})
				
				//点击出价按钮触发出价事件
				d.getElementById("login").addEventListener('click',function(){
					that.joinBid();
				})
			}
			
		}
		
		
})();
