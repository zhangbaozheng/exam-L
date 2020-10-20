//试题列表
import request from '@/utils/request'

export function _getTestList() {
    let url='/exam/exam'
    return request.get(url)
};
export function _getTestType(){
    let url='/exam/examType'
    return request.get(url)
}
export function _getTestSubject(){
    let url='/exam/subject'
    return request.get(url)
}
export function _getTestDetail(id:string){
    let url='/exam/exam'
    return request.get(url,{params:{id}})
}
export function _addTest(values:any){
    let url='/exam/exam'
    return request.post(url,values)
}


