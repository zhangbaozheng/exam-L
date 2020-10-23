import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'
import { _getExam, _getAnswer, _correctExam } from '@/api/exam'
import { Row, Col, Empty, Slider, Popconfirm, message, Button } from 'antd';


interface IProps {
    history: any
}

interface IState{
    [key:string]:any
}
class ExaminationPapers extends Component<IProps,IState> {
    constructor(props:IProps){
        super(props)
        this.state = {
            score: 0,
            examData: [],   //试卷列表
            answerData: [], //答案列表
            text: '你确定提交阅卷吗？'
        }
    }
    render() {
        return (
            <div className="zst-classdetail">
                <h2>阅卷</h2>
                <Row>
                    <Col span={12} className="zst-col1">
                        {
                            this.state.examData.length ? this.state.examData.map((item: any, index: number) => {
                                return <dl key={Date.now() + index}>
                                    <dt><span>第{index + 1}题</span><h3>{item.title}</h3></dt>
                                    <dd><span>正确答案：</span>{item.questions_answer}</dd>
                                    <dd><span>学生答案：</span>{this.state.answerData.length ? (this.state.answerData[index] as any).student_answer : ''}</dd>
                                </dl>
                            }) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        }

                    </Col>
                    <Col span={10} className="zst-col2">
                        <h2>得分：<span style={{ color: 'blue' }}>{this.state.score}</span></h2>
                        <Slider defaultValue={0} onChange={(val: number) => { this.onChange(val) }} />
                        <Popconfirm placement="top" title={this.state.text} onConfirm={() => { this.confirm() }} okText="是" cancelText="否">
                            <Button type="primary">确定</Button>
                        </Popconfirm>
                    </Col>
                </Row>
            </div>
        );
    }
    async confirm() {

        const result = await _correctExam({ exam_student_id: this.props.history.location.state.exam_student_id, score: this.state.score })

        if (result.data.code === 1) { //批改成功
            message.info('批改成功', 1, () => {
                this.props.history.push({
                    pathname: '/index/ExamPaperClassmate',
                    query: {
                        grade_id: this.props.history.location.state.grade_id,
                        grade_name: this.props.history.location.state.grade_name
                    }
                })
            });
        }
    }
    componentDidMount() {
        if (this.props.history.location.state) {
            let id = this.props.history.location.state.exam_exam_id //试卷id
            let exSid = this.props.history.location.state.exam_student_id //要批改的学生id
            this.getExam(id)
            this.getAnswer(exSid)
        }

    }
    async getExam(id: string) { //拿试卷
        const result = await _getExam(id)

        if (result.data.code === 1) {
            this.setState({
                examData: result.data.data.questions
            })
        }
    }
    async getAnswer(exSid: string) { //拿学生答案

        const result = await _getAnswer(exSid)

        if (result.data.code === 1) {

            this.setState({
                answerData: result.data.data.questions
            })
        }
    }
    onChange(value: number) {
        this.setState({
            score: value
        })

    }
}

export default ContentBox({
    title: "阅卷",
    Module: ExaminationPapers
})