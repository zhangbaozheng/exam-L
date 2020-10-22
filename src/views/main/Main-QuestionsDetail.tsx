import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'
import { inject, observer } from "mobx-react"
import axios from "@/utils/request"
import { Tag } from "antd"

interface IProps {
    match: any
}
interface IState {
    list: any[]
}
@inject('examine', 'home') @observer
class QuestionsDetail extends Component<IProps, IState> {
    state = {
        list: [],
    }
    componentDidMount() {
        this.getList()
    }
    async getList() {
        let result = await axios.get('/exam/questions/new')
        if (result.data.code === 1) {
            this.setState({
                list: result.data.data
            })
        }
    }
    render() {
        const { list } = this.state
        const items: any = list.filter((item: any) => item.questions_id === this.props.match.params.id)
        // const leng = items && items.questions_stem.split(".")
        // console.log(leng)
        return (
            <div className="hu-detail">
                <div className="detail-left">
                    {items && items.map((item: any) => {
                        return <div key={item.questions_id}>
                            <h2>出题人：{item.user_name}</h2>
                            <h2>出题信息</h2>
                            <p>
                                <Tag color="blue">{item.questions_type_text}</Tag>
                                <Tag color="blue">{item.subject_text}</Tag>
                                <Tag color="orange">{item.exam_name}</Tag>
                            </p>
                            <h2>{item.title}</h2>
                            <p>{item.questions_stem}</p>
                        </div>
                    })}
                </div>
                <div className="detail-right">
                    {
                        items && items.map((item: any) => {
                            return <div key={item.questions_id}>
                                <div><h4>答案信息</h4></div>
                                <p>{item.questions_answer}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ContentBox({
    title: '试题详情',
    Module: QuestionsDetail
})