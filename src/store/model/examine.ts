import { action, makeObservable, observable } from 'mobx';
import axios from "@/utils/request";
class Examine {
  constructor(){
    makeObservable(this)
  }
  @observable title = 'examine'
  @observable examineList = []
  @observable subjectList = []
  @observable subjectType = []
  @observable questionsType = []

  @action async getExaminList(){
    let result = await axios.get('/exam/questions/new')
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
}

const Store = new Examine();

export default Store;