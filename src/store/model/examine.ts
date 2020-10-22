import { action, makeObservable, observable } from 'mobx';
import axios from "@/utils/request";
class Examine {
  constructor(){
    makeObservable(this)
  }
  @observable title = 'examine'
  //考试类型
  @observable examineList = []
  //科目
  @observable subjectList = []
  @observable subjectType = []
  @observable questionsType = []
  @observable teacherList =[]
  @observable exam_ids:undefined
  @observable subject_ids:undefined
  @observable questions_ids:undefined
  @observable items = null

  @action async getExaminList(){
    let result = await axios.get('/exam/questions/new')
    console.log(result.data.data)
    if(result.data.code === 1){
        this.examineList = result.data.data
    }
  }

  @action async getSubject(){
    let result = await axios.get('/exam/subject')
    if(result.data.code === 1){
      this.subjectList = result.data.data
    }
  }

  @action async getType(){
    let result = await axios.get('/exam/examType')
    if(result.data.code === 1){
      this.subjectType = result.data.data
    }
  }
  
  @action async getQuestion(){
    let result = await axios.get('/exam/getQuestionsType')
    if(result.data.code === 1){
      this.questionsType = result.data.data
    }
  }
  @action async getAllUser(){
    let result = await axios.get('/exam/getAllUser')
    if(result.data.code === 1){
      this.teacherList = result.data.data
    }
  }

  @action async getText(exam_id:any,subject_id:any,questions_type_id:any){
    let result = await axios.get('/exam/questions/condition',{params:{
      exam_id,
      subject_id,
      questions_type_id,
    }}
    )
    if(result.data.code === 1){
      this.examineList = result.data.data
    }
  }
  @action getDetails(id:string){
    let result:any = this.examineList.filter((item:any)=>item.questions_id === id+'')
    this.items = result
  }
}

const Store = new Examine();

export default Store;