/*  
 * @description: 公用JS 
 * @author: name  
 * @update: 2018-01-12
 */

var pro = {};
/***************************************************************/
/**
 * axios
 * 
 */
import axios from 'axios'
import qs from 'qs'
import store from '../../store'
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = store.getters.PATH;
const storea = store
//POST传参序列化(添加请求拦截器，与Content-Type配合使用，如Content-Type=application/json,则无需序列化)
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});
//返回状态判断
axios.interceptors.response.use((res) =>{
    if(!res.data.success){
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});
pro.fetch = function(type, url, params, header){
	return new Promise((resolve, reject) => {
        axios({
        	method: type,
			url: url,
			headers: {
				token:  header.token ? header.token : '',
				secret: header.secret ? header.secret : '',
				version: header.version ? header.version : ''
			},
			data: params
        }).then(response => {
            resolve(response.data);
        }, err => {
            reject(err);
        }).catch((error) => {
           reject(error)
        });
    });
}

/**
 * 时间搓转化成2017-07-07 02:05:00
 * 
 */
pro.getDate=function(time,d){
	var date=new Date(time);
    var year=date.getYear()+1900;
    var month=date.getMonth()+1;
    var day=date.getDate();
    var hour=date.getHours();
    var minu=date.getMinutes();
    var sec=date.getSeconds();
    if(day < 10){
    	day = "0" + day;
    }
    if(month < 10){
    	month = "0" + month;
    }
    if(hour < 10){
    	hour = "0" + hour;
    }
    if(minu < 10){
    	minu = "0" + minu;
    }
    if(sec < 10){ 
    	sec = "0" + sec;
    }
    var d1 = year + "-"+ month + "-" + day + " " + hour + ":" + minu + ":" + sec;
    var d2 = year + "-"+ month + "-" + day;
    var d3 = hour+":"+minu+":"+sec;
    var d4 = hour+":"+minu;
    var d5 = year+"年"+month+"月"+day+"日";
    var d6 = day
    var d7 = year + "-"+ month + "-" + day +" "+"00:00:00"
    if(d == "y-m-d"){
        return d2;
    }else if(d == "y-m-d h:i:s"){
        return d1;
    }else if(d == "h:i:s"){
    	return d3;
    }else if(d == "h:m"){
    	return d4;
    }else if(d == "yy-mm-dd"){
    	return d5;
    }else if(d == "d"){
    	return d6;
    }else if(d == "y-m-d-0"){
    	return d7;
    }
}

/**
 * 数组取最大值、最小值
 * 
 */
pro.getMaximin = function(arr,maximin){ 
	if(maximin == "max"){ 
		return Math.max.apply(Math, arr); 
	}else if(maximin == "min"){ 
		return Math.min.apply(Math, arr); 
	} 
} 

/**
 * 微信授权登录
 * 
 */
pro.toweixin=function(){
	mui.plusReady(function(){
		var auths=null;
		// 扩展API加载完毕，现在可以正常调用扩展API
		plus.oauth.getServices(function(services){
//			console.log("11111111111每次");
			auths = services;
			authLogin();
		},function(e){
			mui( "微信授权失败");
		});
		// 登录操作
		function authLogin(){
			var s = "";
			var choosename = "weixin";
			for(var i in auths){
				if(auths[i].id == choosename){
					s = auths[i];
					break;
				}
			}
			if (!s.authResult){
				s.login( function(e){
					mui.toast("登录认证成功！");
					authUserInfo();
				}, function(e){
					mui.toast("登录认证失败！");
				});
			}else{
				mui.toast("已经登录认证！");
			}
		}
		// 获取登录用户信息操作
		function authUserInfo(){
			var s = "";
			var choosename = "weixin";
			for(var i in auths){
				if(auths[i].id == choosename){
					s = auths[i];
					break;
				}
			}
			if ( !s.authResult ) {
				mui.toast("未登录授权！");
			} else {
				s.getUserInfo( function(e){
					localStorage.weixinUser=JSON.stringify(s.userInfo);
					storea._modules.root.state.account.weixinLoginInfo = true
					authLogout();
				}, function(e){
					mui.toast( "获取用户信息失败，请检查微信是否在线");
				} );
			}
		}
		// 注销所有登录授权认证服务
		function authLogout(){
			for ( var i in auths ) {
				var s = auths[i];
				if ( s.authResult ) {
					s.logout(function(e){
//						console.log( "注销登录认证成功！" );
					}, function(e){
//						console.log( "注销登录认证失败！" );
					});
				}
			}
		}
	})
}
pro.isWXInstalled=function(){
	mui.plusReady(function(){
		var auths=null;
		plus.oauth.getServices(function(services){
			var WXApi = plus.ios.import("WXApi");
			var isWXInstalled = WXApi.isWXAppInstalled();
			localStorage.setItem("isWXInstalled",JSON.stringify(isWXInstalled));
		},function(e){
		});
	});
}
pro.getClentId = function(){
	mui.plusReady(function(){
		var info = plus.push.getClientInfo();
		var clientid = {"id":info.clientid};
		localStorage.setItem("clientid",JSON.stringify(clientid));
	})
}

/**
 * 判断是IOS还是安卓
 * 
 */
pro.isSysterm = function(){
	var u = navigator.userAgent;
	var obj = {};
	obj.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	obj.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	return obj;
}

/**
 * 判断当前版本是PC还是移动端
 * 
 */
pro.isVersion = function(){
   let userAgentInfo = navigator.userAgent;
   let Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
   let flag = true;
   for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
         flag = false;
         break;
      }
   }
   return flag;
}

/**
 * 判断是否开启消息推送()
 */
pro.isOpenMessage = function(){
	var obj = pro.isSysterm();
	if(obj.isiOS == true){
		if(window.plus){
			var UIApplication = plus.ios.import("UIApplication");
			var app = UIApplication.sharedApplication();
			var enabledTypes  = 0;
			if (app.currentUserNotificationSettings) {
			    var settings = app.currentUserNotificationSettings();
			    enabledTypes = settings.plusGetAttribute("types");
			} else {
			        //针对低版本ios系统
			    enabledTypes = app.enabledRemoteNotificationTypes();
			}
			//console.log("enabledTypes:"+enabledTypes);
			if (enabledTypes == 0) {
			    mui.alert( "消息推送已关闭，无法接收通知，请在【设置】-【通知中心】-【应用名称】中开启");
			}
			plus.ios.deleteObject(app);
		}
	}
}
pro.isOpenMessages = function(){
	if(window.plus){
		var pp = plus.navigator.checkPermission('NOTIFITION');
		if(pp != 'authorized'){
			mui.alert( "消息推送已关闭，无法接收通知，请在【设置】-【通知中心】-【应用名称】中开启");
		}
	}
}
pro.openMessages = function(){
	var obj = pro.isSysterm();
	if(obj.isiOS == true){
		if(window.plus){
			var UIApplication = plus.ios.import("UIApplication");
			var app = UIApplication.sharedApplication();
			var enabledTypes  = 0;
			if (app.currentUserNotificationSettings) {
			    var settings = app.currentUserNotificationSettings();
			    enabledTypes = settings.plusGetAttribute("types");
			} else {
			    //针对低版本ios系统
			    enabledTypes = app.enabledRemoteNotificationTypes();
			}
			return enabledTypes;
		}else{
			return false;
		}
	}else{
		return '';
	}
}

/**
 * 判断网络是否已连接
 * @param {} 
 * 
 */
var network = true;
pro.netIsconnected = function(fail, success){
	mui.plusReady(function() {
		document.addEventListener("netchange",function(){
			if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
//				mui.toast("网络异常，请检查网络设置！");
				network = false;
				if(fail) fail();
			}else{
				network = true;
				if(success) success();
			}
		},false);
	});
	return network;
}

/**
 * 判断一个数组中是否包含某一个值
 * arr 数组
 * val 值
 */
pro.objIsInArray = function(arr, val){
	let str = arr.join(',');
	if(str.indexOf(val) == -1){
		return false;
	}else{
		return true;
	}
}
pro.mobileHidden = function (phoneNumber) {
	if (phoneNumber) {
		return  phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
	}else {
		return phoneNumber
	}	
}


let ls = localStorage;
pro.local = {
	set (key,value) {
		let valueS = typeof value === 'string' ? value:JSON.stringify(value)
		ls.setItem(key, valueS)
	},
	get (key) {
		try {
			return JSON.parse(ls.getItem(key))
		} catch (error) {
			console.log(`${key}不存在`)
			return null
		}
		
	},
	remove (key) {
		ls.removeItem(key)
	},
	clear () {
		ls.clear()
	},
	keys () {
		return Object.keys(ls)
	}	
}
pro.toThousands = function (num,nums = 2) {
	return num.toFixed(nums).replace(/\d(?=(?:\d{3})+\b)/g,'$&,'); // 这里看你是不是要小数
}
function toCurrencyString (num){
    
  }

export default pro