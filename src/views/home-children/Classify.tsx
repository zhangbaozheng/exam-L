import React, { Component } from 'react'
import Axios from "@/utils/request"
 class Classify extends Component {
     state={
         list:[]
     }
     componentDidMount(){
         Axios.get('/exam/insertQuestionsType').then(res=>{

              console.log(res)
        })
     }
    render() {
        return (
            <div>
                试题分类
            </div>
        )
    }
}
export default Classify;