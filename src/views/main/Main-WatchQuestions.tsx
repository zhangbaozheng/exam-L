import React, { Component } from 'react'
import { Select, Button, Tag } from 'antd'
import NotData from "@/components/NotData"
import { inject, observer } from "mobx-react"
import ContentBox from '@/components/ContentBox'
import { SearchOutlined } from '@ant-design/icons'
import { RouteComponentProps } from "react-router-dom"

const { Option } = Select;

interface IProps {
    examine: any
    home:any
}
interface IState {
    flag: boolean;
    curIndex: number
    exam_id: string | undefined
    subject_id: string | undefined
    questions_type_id: string | undefined
}


@inject('examine','home') @observer
class WatchQuestions extends Component<IProps & RouteComponentProps, IState> {
    state = {
        flag: false,
        curIndex: -1,
        exam_id: undefined,
        subject_id: undefined,
        questions_type_id: undefined
    }
    componentDidMount() {
        this.props.examine.getExaminList()
        this.props.examine.getSubject()
        this.props.examine.getType()
        this.props.examine.getQuestion()
        this.props.examine.getAllUser()
    }

    handleChange(type: string, value: any) {

        switch (type) {
            case "examid":
                this.setState({
                    exam_id: value
                })
            break
            case "question":
                    this.setState({
                        questions_type_id:value
                })
            break
        }
    }
    changeAll = () => {
        this.setState({
            flag: !this.state.flag,
            curIndex: -1
        })
    }
    changeCruindex = (ind: number, id: string) => {
        this.setState({
            curIndex: ind,
            subject_id: id
        })
    }
    goDetail = (id: string) => {
        this.props.home.setTitle('详情页面')
        this.props.history.push(`/index/examDetail/${id}`)
    }
    search = () => {
        const { exam_id,subject_id,questions_type_id } = this.state
        this.props.examine.getText(exam_id,subject_id,questions_type_id)
    }
    render() {
        const { examineList, subjectList, subjectType, questionsType, getText } = this.props.examine
        const { flag, curIndex } = this.state
        return (
            <div className="hu-examine">
                <div className="examine-title">
                    <div className="title-top">
                        <div className="left">课程类型：</div>
                        <div className="right">
                            <span onClick={() => this.changeAll()} className={this.state.flag ? "actives" : ""}>All</span>
                            {
                                subjectList.map((item: any, ind: number) => {
                                    return <span key={ind}
                                        className={flag || curIndex === ind ? 'actives' : ''}
                                        onClick={() => this.changeCruindex(ind, item.subject_id)}>
                                        {item.subject_text}
                                    </span>
                                })
                            }
                        </div>
                    </div>
                    <div className="title-bottom">
                        <div>
                            <span>考试类型：</span>
                            <Select style={{ width: 200 }} onChange={this.handleChange.bind(this, 'examid')}>
                                {
                                    subjectType.map((item: any, index: number) => {
                                        return <Option value={item.exam_id} key={index}>{item.exam_name}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        <div>
                            <span>题目类型：</span>
                            <Select style={{ width: 200 }} onChange={this.handleChange.bind(this, 'question')}>
                                {
                                    questionsType.map((item: any, index: number) => {
                                        return <Option value={item.questions_type_id} key={index}>{item.questions_type_text}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        <div>
                            <Button type="primary" icon={<SearchOutlined />} onClick={() => this.search()}>查询</Button>
                        </div>
                    </div>
                </div>
                <div className="examine-main">
                    {
                        examineList.length === 0?<NotData/>:
                        <ul>
                        {
                            examineList.map((item: any, index: number) => {
                                return <li key={index} >
                                    <div className="left" onClick={() => this.goDetail(item.questions_id)}>
                                        <h2>{item.title}</h2>
                                        <p>
                                            <Tag color="blue">{item.questions_type_text}</Tag>
                                            <Tag color="blue">{item.subject_text}</Tag>
                                            <Tag color="orange">{item.exam_name}</Tag>
                                        </p>
                                        <p className="hu-author">
                                            <span>{item.user_name}发布</span>
                                        </p>
                                    </div>
                                    <div className="right">
                                        <a href="">编辑</a>
                                    </div>

                                </li>
                            })
                        }
                    </ul>
                    }
                </div>
            </div>
        )
    }
}

export default ContentBox({
    title: '查看试题',
    Module: WatchQuestions
})
