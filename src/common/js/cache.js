import storage from 'good-storage'
import store from '@/store/index.js'

const TOKEN = '__token__'
const FRIEND_REQUEST = '__friend_request__'
const FRIEND_LIST = '__friend_list__'
const USER_INFO = '__user_info__'

//清除所有
export function clear() {
  storage.remove(TOKEN)
  storage.remove(FRIEND_REQUEST)
  storage.remove(FRIEND_LIST)
  storage.remove(USER_INFO)
}


//设置当前用户信息
export function setUserInfo(value){
  storage.set(USER_INFO,value)
}

//获取当前用户信息
export function getUserInfo(){
  let data = storage.get(USER_INFO,[]);
  return data;
}

//断网后需要清除的数据
export function exp_clear(){
  storage.remove(FRIEND_REQUEST);//请求列表
  del_friend_list(); //好友列表
}

//设置token
export function setToken(value) { 
  storage.set(TOKEN, value)
}

//获取token
export function getToken() {
  let token = storage.get(TOKEN, '')
  return token;
}

//删除token
export function removeToken() {
  storage.remove(TOKEN)
}

//是否有token
export function hasToken() {
  let result = storage.has(TOKEN)
  if (result) {
    return true;
  }
  return false;
}


//设置好友请求
export function set_friend_request(value,bool=false) {
	if (bool) {
    storage.set(FRIEND_REQUEST,value);
  }else{
    let arr = get_friend_request();
    console.log(arr)
    arr.push(value);
    storage.set(FRIEND_REQUEST,arr);
  }
}

//获取好友请求列表
export function get_friend_request() {
	let result = storage.get(FRIEND_REQUEST,[])
  return result;
}

//删除好友请求
//value需要删除的
export function del_friend_request(value){
	let arr = get_friend_request();
	const index = arr.findIndex( (item) => {
    return item.uid === value.uid
  });
  if (index > -1) {
    arr.splice(index, 1)
    storage.set(FRIEND_REQUEST,arr);
  }
}


//设置好友列表数据
  export function set_friend_list(value){
    storage.set(FRIEND_LIST,value);
  }


//获取好友列表数据
  export function get_friend_list(){
    let result = storage.get(FRIEND_LIST,[]);
    return result;
  }

//删除好友列表
export function del_friend_list(){
  storage.remove(FRIEND_LIST)
}



//好友消息处理
export function friend_send_news(data){
  if (!data) {
    return false;
  }
  var UserInfo = getUserInfo();
  var key = UserInfo.username+'_'+data.id;

  let arr = storage.get(key);

  if (arr) {
    if (!arr.data) {
      arr.data = [];
    }
    if(arr.unreadNumber){
      arr.unreadNumber = arr.unreadNumber + 1;
    }else{
      arr.unreadNumber = 1;
    }

    arr.sortTime = Math.round(Date.parse(new Date()) / 1000);

    arr.data.push({
      'own':false,
      'content':data.content,
      'time':data.time
    });
    storage.set(key,arr);
  }else{
    let obj = {};
    let fiend_list = get_friend_list();
    try {
      fiend_list.forEach((item, index) => {
        item.items.forEach((value,key) => {
          if(value.id == data.id){
            obj.id = data.id;
            obj.username = value.username;
            obj.nickname = value.nickname;
            obj.picture = value.picture;
            obj.unreadNumber = 1; //未读消息数
            obj.sortTime = Math.round(Date.parse(new Date()) / 1000);
            obj.data = [{
              'own':false,
              'content':data.content,
              'time':data.time
            }];
            throw new Error("ok");
          }
        });
      });
    }catch(e) {
    
    };    
    storage.set(key,obj);    
  }
  store.commit('set_information_update', Date.parse(new Date()))
}
