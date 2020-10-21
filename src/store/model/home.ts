
import { action, makeObservable, observable } from 'mobx';
import axios from "@/utils/request";
class Home {
  constructor(){
    makeObservable(this)
  }
  @observable title = 'home'
  @observable classifyList = []
  @observable id = 1


  @action async getClassifyList(){
    let result = await axios.get('/exam/getQuestionsType').then(res=>{
      return res.data
    })
    if(result.code === 1){
      this.classifyList = result.data
    }
  }
}
const Store = new Home()
export default Store;
