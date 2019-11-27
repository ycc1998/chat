import router from "@/router";
import {SOCKET_URL} from "@/api/config";
import {setToken,getToken,removeToken,set_friend_request,del_friend_list,exp_clear,friend_send_news} from '@/common/js/cache';
import store from '@/store/index.js'
import {Message} from 'element-ui'

var websock = null
var globalCallback = null
var timePing = null
 
 // 初始化websocket
function initWebSocket () {
  // ws地址 -->这里是你的请求路径

  let token = getToken();
	if (token.length < 1) {
    setTimeout(function () {
      router.push({
        path: `/sign`
      })    
    }, 1000);	  
    return false;
	}

  if (websock) {
    return false;
  }

  var ws= SOCKET_URL;
  websock = new WebSocket(ws+'?token='+token)
  websock.onmessage = function (e) {
    websocketonmessage(e)
  }
  websock.onclose = function (e) {
    websocketclose(e)
  }
  websock.onopen = function () {
    websocketOpen()
  }
 
  // 连接发生错误的回调方法
  websock.onerror = function () {
    console.log('WebSocket连接发生错误')
  }
}
 
// 实际调用的方法
/*
*callback 回调
*/
function sendSock (agentData, callback) {
  globalCallback = callback
  if (websock.readyState === websock.OPEN) {
    // 若是ws开启状态
    websocketsend(agentData)
  } else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData, callback)
    }, 1000)
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData, callback)
    }, 1000)
  }
}
 
// 数据接收
function websocketonmessage (e) {
  var data = e.data;
  var param = null;
  if (typeof data == 'string') {
    try {
      var obj=JSON.parse(data);
      if(typeof obj == 'object' && obj){
          param = obj;
      }else{
          param = data;
      }
    } catch(e) {
        param = data;
    }
  }else{
    param = data;
  }
  console.log(param)
  //更新token
  if (param.result.token) {
    console.log('更新额')
    setToken(param.result.token);
  }

  if (param.result.code == 999 || param.result.code == 4000) {
    //token验证失败 账号在另一处登录
    console.log(param.result)
    Message({
      message: param.msg,
      type: 'error',
      duration: 3 * 1000
    });
    removeToken();
    router.push({
      path: `/sign`
    })
    //主动断开链接清空对象数据
    websock.close();
    websock = null;
    websocketClearPing(timePing);
  }else if(param.result.code == 2048){
    //好友添加请求
    set_friend_request(param.result.data);
    store.commit('set_red', true)
  }else if(param.result.code == 3333){
    //刷新好友列表
    del_friend_list();
  }else if(param.result.code == 1024){
    //处理好友发送的消息
    friend_send_news(param.result);
  }else{
    //globalCallback(param);
  }
  

}
 
// 数据发送
function websocketsend (agentData) {
	if(typeof(agentData)=='string'){
		websock.send(agentData)
	}else{
		websock.send(JSON.stringify(agentData))
	}
  
}
 
// 关闭
function websocketclose (e) {
  console.log('关闭了')
  store.commit('set_initialization', true)
  exp_clear();//清除好友请求 缓存
  websocketClearPing(timePing);
}
 
// 创建 websocket 连接
function websocketOpen (e) {
  console.log('连接成功')
  setTimeout(()=>{
    websocketPing();
  },30*1000);
  
}

//定时发送心跳包
function websocketPing(){
	timePing = setInterval(function(){
		//定时发送ping
    var data = {
      'token':getToken()
    };
		websocketsend(data);
	},30*1000);

}

//取消发送心跳包 data 定时器名称
function websocketClearPing(data){
	clearInterval(data);
}

//主动关闭连接
function closeSocket(){
  if (websock) {
    websock.close();
    websock = null;
    websocketClearPing(timePing);
  }
}


//判断socket是否正常
 function is_normal(){
  if (websock) {
    if (websock.readyState == 1) {
      return true;
    }else{
      closeSocket();
      return false;
    }
  }else{
    return false;
  }
}
 

 
// 将方法暴露出去
export {sendSock,initWebSocket,closeSocket,is_normal}


/*
999 token验证失败或过期
4000  账户在别处登录
3333 需要刷新好友列表
1024 好友发送的消息
*/



