/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: 赵舒婷
 * @Date: 2020-10-20 13:20:29
 * @LastEditors: 赵舒婷
 * @LastEditTime: 2020-10-20 20:37:49
 */
import request from '@/utils/request'
export function _getExamList(val:any){ //拿班级对应的学生名单
    let url = '/exam/student'
    return request.get(url,{
        params:val
    })
}
export function _getExam(val:string){ //通过试卷id获取试卷
    let url = `/exam/exam/${val}`
    return request.get(url)

}
export function _getAnswer(val:string){ //通过学生id获取试卷详情
    let url = `/exam/student/${val}`
    return request.get(url)

}  

export function _correctExam({exam_student_id,score}:any){ //批改分数
    let url = `/exam/student/${exam_student_id}`
    return request.put(url,{score})
}

export function _getTestDetail(id:string){
    let url='/exam/exam'
    return request.get(url,{params:{id}})
}
//试题列表

export function _getTestList() {
    let url='/exam/exam'
    return request.get(url)
};
//考试类型
export function _getTestType(){
    let url='/exam/examType'
    return request.get(url)
}
//选择课程
export function _getTestSubject(){
    let url='/exam/subject'
    return request.get(url)
}

//添加试卷
export function _addTest(values:any){
    let url='/exam/exam'
    return request.post(url,values)
}
//试卷详情
export function _TestDetail({exam_exam_id}:any){
    let url=`/exam/exam`
    return request.get(url,exam_exam_id)
}
//试题获取
export function _getQues(){
    let url='/exam/questions/new'
    return request.get(url)
}
//问题类型
export function _getQuesType(){
    let url='/exam/getQuestionsType'
    return request.get(url)
}
//按条件获取试题

export function _getQuesCon(subject_id: any,exam_id:any,questions_type_id:any)
{
    let url=`/exam/questions/condition?subject_id=${subject_id}&exam_id=${exam_id}&questions_type_id=${questions_type_id}`;
    return request.get(url)
}
