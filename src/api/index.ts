/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: 赵舒婷
 * @Date: 2020-10-19 20:58:19
 */
import request from '@/utils/request'
//用户登录
export function _login({user_name,user_pwd}:any){ 
    let url = '/user/login'
    return request.post(url,{user_name,user_pwd})
}
//用户数据
export function _user() {
    let url = '/user/user';
    return request.get(url);
}
//身份数据
export function _identity() {
    let url = '/user/identity';
    return request.get(url)
}
//api接口权限
export function _relation() {
    let url = '/user/api_authority'; 
    return request.get(url)
}
//身份和api接口关系
export function _authority() {
    let url = '/user/identity_api_authority_relation';
    return request.get(url)
}
//视图接口权限
export function _view_authority() {
    let url = '/user/identity_view_authority_relation';
    return request.get(url)
}
//身份和视图权限关系
export function _user_new(userId:any) {
    let url = '/user/new';
    return request.get(url,{
        params:{
            'user_id':userId
        }
    })
}

export function _userInfo() {
    const url = '/user/userInfo'
    return request.get(url)
}

export function _GetUserNew(user_id:string) {
    const url = '/user/new'
    return request.get(url,{
        params: {
            user_id
        }
    })
}
