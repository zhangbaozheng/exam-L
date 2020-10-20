/*
 * @Author: 大郑
 * @Date: 2020-10-20 19:38:32
 * @LastEditTime: 2020-10-20 21:36:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exam-L\src\api\userAdd.ts
 */
import request from '@/utils/request'

export function _userAdd(userObj:object) {
    console.log(userObj)
    let url = '/user';
    return request.post(url,userObj);
}
//获取身份id信息
export function _identity() {
    let url = '/user/identity';
    return request.get(url)
}
//更新用户信息
export function _updateUser() {
    let url = '/user/user';
    return request.get(url)
}
export function _updateUsers(userObj:object) {
    let url = '/user/user';
    return request.put(url,userObj)
}