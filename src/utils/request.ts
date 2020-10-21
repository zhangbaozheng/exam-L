/*
 * @Author: yangyangy
 * @Date: 2020-10-15 08:52:40
 * @Last Modified by: yangyangy
 * @Last Modified time: 2020-10-15 08:52:41
 */

import axios from 'axios';
import { getCookie } from '@/utils/index';

const request = axios.create();

request.interceptors.request.use((config) => {
  config.headers.authorization = getCookie('token') || ""
  return config;
}, (error) => {
  return Promise.reject(error)
})

request.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error)
})

export default request;