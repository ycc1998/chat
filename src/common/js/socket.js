export {SOCKET_URL} from "@/api/config";


export default class Socket {
	//初始化weosocket
	constructor(){
	  this.websock = new WebSocket(SOCKET_URL);
	  this.websock.onmessage = this.websocketonmessage;
	  this.websock.onopen = this.websocketonopen;
	  this.websock.onerror = this.websocketonerror;
	  this.websock.onclose = this.websocketclose;
	}

	//连接建立之后执行send方法发送数据
	websocketonopen(){ 
		console.log('打开了')
	}

	//连接建立失败重连
	websocketonerror(){
	  this.initWebSocket();
	}

	//数据接收
	websocketonmessage(e){ 	
	  const redata = JSON.parse(e.data);
	}

	//数据发送
	websocketsend(Data){
	  this.websock.send(Data);
	}

	//关闭
	websocketclose(e){  
	  console.log('断开连接',e);
	}

}




