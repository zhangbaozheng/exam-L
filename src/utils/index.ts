/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: 赵舒婷
 * @Date: 2020-10-21 08:51:37
 * @LastEditors: 赵舒婷
 * @LastEditTime: 2020-10-21 15:50:58
 */

export function setCookie(key:string, val:any) {
  localStorage.setItem(key, val)
}

export function getCookie(key:string) {
  return localStorage.getItem(key)
}

export function removeCookie(key:string) { //移除本地存储的方法
  return localStorage.removeItem(key)
}

export function timeChange(time:string) { //转换时间
  const num = Number(time);//时间转换成数字
  return  new Date(num).toLocaleString().replace(/:\d{1,2}$/,' ') 
}