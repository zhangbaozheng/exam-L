/*
 * @Author: 大郑
 * @Date: 2020-10-20 19:38:32
 * @LastEditTime: 2020-10-21 15:16:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exam-L\src\api\userAdd.ts
 */
import request from "@/utils/request";
//添加用户
export function _userAdd(userObj: object) {
  console.log(userObj);
  let url = "/user";
  return request.post(url, userObj);
}
//获取身份id信息
export function _identity() {
  let url = "/user/identity";
  return request.get(url);
}
//更新用户信息
export function _updateUser() {
  let url = "/user/user";
  return request.get(url);
}

export function _updateUsers(userObj: object) {
  let url = "/user/user";
  return request.put(url, userObj);
}
//添加身份
export function _userEdit(values: any) {
  let url = "/user/identity/edit";
  return request.get(url, {
    params: {
      identity_text: values,
    },
  });
}
//添加api接口权限
export function _userApiEdit(values: any) {
  console.log(values);
  let url = "/user/authorityApi/edit";
  return request.get(url, {
    params: {
      api_authority_method: values.api_authority_method,
      api_authority_text: values.api_authority_text,
      api_authority_url: values.api_authority_url,
    },
  });
}
//添加视图接口权限
export function _userAddView(values: any) {
  let view_authority_text = values.arr[0].view_authority_text;
  let url = "/user/authorityView/edit";
  return request.get(url, {
    params: {
      view_authority_text: view_authority_text,
      view_id: values.view_id,
    },
  });
}
//获取已有视图数据
export function _userView() {
  let url = "/user/view_authority";
  return request.get(url);
}
//给身份设置api视图权限
export function _userSetApi(value: object) {
  let url = "/user/setIdentityApi";
  return request.post(url, value);
}
//获取身份数据
export function _userIdentity() {
  let url = "/user/identity";
  return request.get(url);
}
//获取所有考试数据
export function _userAuthority() {
  let url = "/user/api_authority";
  return request.get(url);
}
//设置身份视图权限
export function _userSetApiView(value: object) {
  let url = "/user/setIdentityView";
  return request.post(url, value);
}
