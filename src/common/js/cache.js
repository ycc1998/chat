import storage from 'good-storage'

const TOKEN = '__token__'

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
