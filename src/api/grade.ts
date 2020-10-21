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
export function _gradeListDel(id:string) {
  return request.delete('/manger/grade/delete',{
    data: {
      grade_id: id
    }
  })
}

//添加班级
export function _gradeListAdd(value:any) {
  return request.post('/manger/grade',value)
}

//修改班级
export function _gradeListEdit(value:any) {
  return request.put('/manger/grade/update',JSON.stringify({
    grade_id:value.grade_id,
    room_id:value.room_id,
    subject_id:value.subject_id
  }),{
    headers:{
      'Content-type':'application/json'
    }
  })
}




//教室管理
//获取教室信息
export function _getRoomList() {
  return request.get('/manger/room')
}

//删除教室
export function _gradeRoomDel(id:string) {
  return request.delete('/manger/room/delete',{
    data: {
      eoom_id: id
    }
  })
}

//添加教室
export function _gradeRoomAdd(value:any) {
  return request.post('/manger/room',value)
}





//学生管理
//学生数据信息
export function _getStudentList() {
  return request.get('/manger/student')
}

//删除
export function _gradeStudentDel(id:string) {
  return request.delete(`/manger/student/${id}`)
}