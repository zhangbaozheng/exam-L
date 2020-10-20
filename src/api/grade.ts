/*
 * @Description: 
 * @Author: 王寒烟
 * @Date: 2020-10-19 19:20:22
 * @LastEditTime: 2020-10-19 21:36:56
 * @LastEditors: 王寒烟
 * @FilePath: \exam-L\src\api\grade.ts
 */
import axios from 'axios';

//班级信息
export function _getGradeList() {
  return axios.get('/manger/grade')
}

//删除班级
export function _gradeListDel(id: string,token:string) {
  return axios.delete('/manger/grade/delete',{params:{id,token}})
}