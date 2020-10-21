import request from "@/utils/request"
import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'

interface Props {

}
interface State {

}

class QuestionsType extends Component<Props, State> {
    state = {
        list: []
    }
    componentDidMount() {
        request.get('/exam/insertQuestionsType').then(res => {

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

export default ContentBox({
    title: '添加试题',
    Module: QuestionsType
})
