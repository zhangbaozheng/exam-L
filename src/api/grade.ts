/*
 * @Description: 
 * @Author: 王寒烟
 * @Date: 2020-10-19 19:20:22
 * @LastEditTime: 2020-10-20 13:20:51
 * @LastEditors: 赵舒婷
 * @FilePath: \exam-L\src\api\grade.ts
 */
import request from '@/utils/request'

//班级信息
export function _getGradeList() {
  return request.get('/manger/grade')
}

//删除班级
export function _gradeListDel(id: string,token:string) {
  return request.delete('/manger/grade/delete',{params:{id,token}})
}