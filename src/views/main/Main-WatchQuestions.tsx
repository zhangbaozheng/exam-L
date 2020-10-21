import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'
import { inject, observer } from "mobx-react"
import { RouteComponentProps } from "react-router-dom"
import { Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Option } = Select;

interface IProps {
    examine: any;
}
interface IState {
    flag: boolean;
    curIndex: number
}


@inject('examine') @observer
class WatchQuestions extends Component<IProps & RouteComponentProps, IState> {
    state = {
        flag: false,
        curIndex: -1
    }
    componentDidMount() {
        console.log(this);
        this.props.examine.getExaminList()
        this.props.examine.getSubject()
        this.props.examine.getType()
        this.props.examine.getQuestion()
    }

    handleChange(value: any) {
        console.log(`selected ${value}`);
    }
    changeAll = () => {
        this.setState({
            flag: !this.state.flag,
            curIndex: -1
        })
    }
    changeCruindex = (ind: number) => {
        this.setState({
            curIndex: ind
        })
    }
    goDetail = (id: string) => {
        // this.props.history.push(`public/spa/spa/main/questions/detail?id=${id}`)
        window.location.href = "http://127.0.0.1:7001/public/spa/spa/main/questions/detail?id=4vu7t9-t9vv08-chvz3r-n8i3nq"
    }
    render() {
        const { examineList, subjectList, subjectType, questionsType } = this.props.examine
        const { flag, curIndex } = this.state
        console.log(subjectType, questionsType)
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
                                        onClick={() => this.changeCruindex(ind)}>
                                        {item.subject_text}
                                    </span>
                                })
                            }
                        </div>
                    </div>
                    <div className="title-bottom">
                        <div>
                            <span>考试类型：</span>
                            <Select style={{ width: 200 }} onChange={this.handleChange}>
                                {
                                    subjectType.map((item: any, index: number) => {
                                        return <Option value={item.exam_id} key={index}>{item.exam_name}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        <div>
                            <span>题目类型：</span>
                            <Select style={{ width: 200 }} onChange={this.handleChange}>
                                {
                                    questionsType.map((item: any, index: number) => {
                                        return <Option value={item.questions_type_id} key={index}>{item.questions_type_text}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        <div>
                            <Button type="primary" icon={<SearchOutlined />}>查询</Button>
                        </div>
                    </div>
                </div>
                <div className="examine-main">
                    <ul>
                        {
                            examineList.map((item: any, index: number) => {
                                return <li key={index}>
                                    <div className="left" onClick={() => this.goDetail(item.json_path)}>
                                        <p>{item.title}</p>
                                        <p>
                                            <span>代码补全</span>
                                        </p>
                                        <p className="hu-author">
                                            <span>heinan发布</span>
                                        </p>
                                    </div>
                                    <div className="right">
                                        <a href="">编辑</a>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default ContentBox({
    title: '查看试题',
    Module: WatchQuestions
})
