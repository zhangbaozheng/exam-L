import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'
import { Form, Input, Button, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

interface Props {

}
interface State {

}

class AddQuestions extends Component<Props, State> {
    state = {
        layout: {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        },
        tailLayout: {
            wrapperCol: { offset: 8, span: 16 },
        }
    }

    onFinish = (values: string) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    handleChange(value: any) {
        console.log(`selected ${value}`);
    }
    render() {
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
                            name="username"
                            rules={[{ required: true, message: '请输入题目标题！' }]}
                        >
                            <Input placeholder="请输入题目标题，不超过20个字！" maxLength={20} />
                        </Form.Item>
                    </div>
                    <div className="test-subject">
                        <div className="subject-title">
                            <h2>题目主题</h2>
                        </div>
                        
                        <div className="test-content">
                            <div className="test-content-top">
                                <ul>
                                    <li>
                                       1 {/* <span className="iconfont icon-web-icon--copy"></span> */}
                                    </li>
                                    <li>2</li>
                                    <li>3</li>
                                    <li>4</li>
                                    <li>5</li>
                                    <li>6</li>
                                    <li>7</li>
                                    <li>8</li>
                                    <li>9</li>
                                    <li>10</li>
                                </ul>
                                <ul>
                                    <li>11</li>
                                    <li>22</li>
                                </ul>
                            </div>

                            <div className="test-content-bottom">
                                <ul>
                                </ul>
                                <div>
                                    <TextArea rows={4} autoSize={{ minRows: 30 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>请选择考试类型</h2>
                        <Select defaultValue="lucy" style={{ width: 260 }} onChange={(vals) => this.handleChange(vals)}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                        </Select>
                    </div>
                    <div>
                        <h2>请选择课程类型</h2>
                        <Select defaultValue="lucy" style={{ width: 260 }} onChange={(vals) => this.handleChange(vals)}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                        </Select>
                    </div>
                    <div>
                        <h2>请选择题目类型</h2>
                        <Select defaultValue="lucy" style={{ width: 260 }} onChange={(vals) => this.handleChange(vals)}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                        </Select>
                    </div>
                    <div className="test-answer">
                        <h2>答案信息</h2>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>5</li>
                                <li>6</li>
                                <li>7</li>
                                <li>8</li>
                                <li>9</li>
                                <li>10</li>
                            </ul>
                            <ul>
                                <li>11</li>
                                <li>22</li>
                            </ul>
                            <div>
                                <ul>
                                </ul>
                                <div>
                                    <TextArea rows={4} autoSize={{ minRows: 30 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default ContentBox({
    title: '添加试题',
    Module: AddQuestions
})
