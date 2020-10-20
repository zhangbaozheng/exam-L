/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: 赵舒婷
 * @Date: 2020-10-19 20:58:19
 * @LastEditors: 赵舒婷
 * @LastEditTime: 2020-10-19 21:42:28
 */
import request from '../utils/request'

export function _login({user_name,user_pwd}:any){ //用户登录
    let url = '/user/login'
 
    return request.post(url,{user_name,user_pwd})
}

