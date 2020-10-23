/*
 * @Description:
 * @Author: 王寒烟
 * @Date: 2020-10-19 19:20:22
 * @LastEditTime: 2020-10-23 13:53:32
 * @LastEditors: 王寒烟
 * @FilePath: \exam-L\src\api\grade.ts
 */
import request from "@/utils/request";

//班级信息
export function _getGradeList() {
  return request.get("/manger/grade");
}

//删除班级
export function _gradeListDel(id:string) {
  return request.delete('/manger/grade/delete',{
    params: {
      grade_id: id
    }
  })
}

//添加班级
export function _gradeListAdd(value: any) {
  return request.post("/manger/grade", value);
}

//修改班级
export function _gradeListEdit(value: any) {
  return request.put(
    "/manger/grade/update",
    JSON.stringify({
      grade_id: value.grade_id,
      room_id: value.room_id,
      subject_id: value.subject_id,
    }),
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
}

//教室管理
//获取教室信息
export function _getRoomList() {
  return request.get("/manger/room");
}

//删除教室
export function _gradeRoomDel(id: string) {
  return request.delete("/manger/room/delete", {
<<<<<<< HEAD
    params: {
      room_id: id,
=======
    data: {
      eoom_id: id,
>>>>>>> f0467581aeb307b18e5b1c516d3b7b8a79f116fc
    },
  });
}

//添加教室
export function _gradeRoomAdd(value: any) {
  return request.post("/manger/room", value);
<<<<<<< HEAD
=======
}





//获取课程信息
export function _getSubjectList() {
  return request.get('/exam/subject')
>>>>>>> f0467581aeb307b18e5b1c516d3b7b8a79f116fc
}





<<<<<<< HEAD
//获取课程信息
export function _getSubjectList() {
  return request.get('/exam/subject')
}





=======
>>>>>>> f0467581aeb307b18e5b1c516d3b7b8a79f116fc


//学生管理
//学生数据信息
export function _getStudentList() {
  return request.get("/manger/student");
}

//删除
export function _gradeStudentDel(id: string) {
  return request.delete(`/manger/student/${id}`);
}
//根据班级id来获取每个班级学生的分数
export function _gradeStudent(obj: object) {
  console.log(obj);
  let url = "/grade/getstudent";
  return request.post(url, obj);
}
//根据班级获取名字

export function _studentName(obj: any) {
  console.log(obj);
  let url = "/exam/student";
  return request.get(url, {
    params: {
      grade_id: obj.grade_id ? obj.grade_id : "tjdbk9-r8dbn8-4wsck-c7akdb",
    },
  });
}
