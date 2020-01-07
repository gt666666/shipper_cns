import  Cookies from 'js-cookie'  // js-cookie是一个简单的，轻量级的处理cookies的js API。

const tokenKey = 'Admin-Token'

// 存
export function setToken (token) {
  let seconds = 10;
  let expires = new Date(new Date() * 1 + seconds * 1000);
  return Cookies.set(tokenKey, token,expires)  //失效时间是10秒
  // expires: 7 设置有效期7天
  // Cookies.set('name', 'value', { expires: 7, path: '' });
}
// 取
export function getToken () {
  return Cookies.get(tokenKey)
}
// 删除
export function removeToken () {
  return Cookies.remove(tokenKey)
}
