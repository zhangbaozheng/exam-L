import ContentBox from '@/components/ContentBox'
import React, { Component } from 'react'
import { Form, Input, Button, Select, Modal, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import { inject, observer } from "mobx-react"
import Axios from '@/utils/request';
import E from 'wangeditor'
const { Option } = Select;
let editor :E|null = null;
let editor1 :E|null = null;
interface IState {
    layout: object;
    tailLayout: object;
    visible: boolean;
    values: any;
}

@inject('examine') @observer
class AddQuestions extends Component<any, IState> {
    state = {
        layout: {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        },
        tailLayout: {
            wrapperCol: { offset: 8, span: 16 },
        },
        visible: false,
        values: null,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    openNotification = () => {
        notification.open({
            message: '恭喜你！',
            description: "添加成功，快去查看吧！",
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };
    handleOk = () => {
        this.setState({
            visible: false,
        });
        const { values } = this.state
        this.addTestList(values)
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        this.props.examine.getType()
        this.props.examine.getSubject()
        this.props.examine.getQuestion()
        editor = new E("#box1")
        editor1 = new E("#box2")
        //权重
        editor.config.zIndex = 500
        editor1.config.zIndex = 500
        editor.create()
        editor1.create()
    }
    componentWillUnmount(){
        editor?.destroy();
        editor1?.destroy();
    }
    onFinish = (values: any) => {
        console.log(values)
        this.setState({
            values: values
        })
        this.showModal()
    };

    //添加试题
    async addTestList(values: any) {
        let res: any = localStorage.getItem("userInfo");
        let result = JSON.parse(res)
        let text = await Axios.post('/exam/questions', {
            questions_type_id: values.questions_type_id,
            questions_stem: (editor as E).txt.text(),
            subject_id: values.subject_id,
            exam_id: values.exam_id,
            user_id: result.user_id,
            questions_answer: (editor1 as E).txt.text(),
            type: "addQuestions/addQuestions",
            title: values.title,
        })
        console.log(text.data.code)
        if (text.data.code === 1) {
            this.openNotification()
        }

    }
    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    handleChange(value: any) {
        console.log(`selected ${value}`);
    }

     getText = () =>{
        alert((editor as E).txt.text())
        console.log((editor as E).txt.text())
      }


    render() {
        const { subjectType, subjectList, questionsType } = this.props.examine
        return (
            <div className="hu-addtest">
                <Form
                    {...this.state.layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={(val) => this.onFinish(val)}

                >
                    <h2>题目信息</h2>
                    <div className="test-stem">
                        <h2>题干</h2>
                        <Form.Item
                            name="title"
                            rules={[{ required: true, message: '请输入题目标题！' }]}
                        >
                            <Input placeholder="请输入题目标题，不超过20个字！" maxLength={20} />
                        </Form.Item>
                    </div>
                    <div className="test-subject">
                        <div className="subject-title">
                            <h2>题目主题</h2>
                        </div>
                            <div id="box1"></div>
                    </div>
                    <div>
                        <h2>请选择考试类型</h2>
                        <Form.Item
                            name="exam_id"
                            rules={[{ required: true, message: '请选择考试类型！' }]}
                        >
                            <Select defaultValue="请选择" style={{ width: 260 }} onChange={(vals) => this.handleChange(vals)}>
                                {
                                    subjectType.map((item: any) => {
                                        return <Option key={item.exam_id} value={item.exam_id}>{item.exam_name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>

                    </div>
                    <div>
                        <h2>请选择课程类型</h2>
                        <Form.Item
                            name="subject_id"
                            rules={[{ required: true, message: '请选择课程类型' }]}
                        >
                            <Select defaultValue="请选择" style={{ width: 260 }} onChange={(vals) => this.handleChange(vals)}>
                                {
                                    subjectList.map((item: any) => {
                                        return <Option key={item.subject_id} value={item.subject_id}>{item.subject_text}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <div>
                        <h2>请选择题目类型</h2>
                        <Form.Item
                            name="questions_type_id"
                            rules={[{ required: true, message: '请选择题目类型！' }]}
                        >
                            <Select defaultValue="请选择" style={{ width: 260 }} onChange={(vals) => this.handleChange(vals)} id="first">
                                {
                                    questionsType.map((item: any) => {
                                        return <Option id="mines" key={item.questions_type_id} value={item.questions_type_id}>{item.questions_type_text}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="test-answer">
                        <div className="test-answer-title">
                            <h2>答案信息</h2>
                        </div>
                        <div className="test-content">
                                <div id="box2"></div>
                        </div>
                    </div>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="确认"
                >
                    <p>是否确定要添加？？？</p>
                </Modal>
            </div>
        )
    }
}

export default ContentBox({
    title: '添加试题',
    Module: AddQuestions
})
