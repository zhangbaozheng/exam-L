import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'
import { Form, Input, Button, Select, DatePicker, InputNumber } from 'antd';
import { _addTest, _getTestSubject, _getTestType } from '@/api/exam'
const { Option } = Select;
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

interface Props {

}
interface State {

}

class ExamEdit extends Component<Props, State> {
    state = {
        fields: {
            subject_id: '',
            exam_id: '',
            title: '',
            number: '',
            start_time: '',
            end_time: ''
        },
        type: [],
        sub: []
    }
    componentDidMount() {
        this.getTestSubject()
        this.getTestType()

    }

    async getTestType() {
        const res = await _getTestType();
        if (res.data.code) {
            this.setState({
                type: res.data.data
            })
        }
    }
    async getTestSubject() {
        const res = await _getTestSubject();
        if (res.data.code) {
            this.setState({
                sub: res.data.data
            })
        }
    }
    onFinish = async (values: any) => {
        console.log('Success:', values);
        values = Object.assign(this.state.fields, values, {
            number: Number(values.number),
            start_time: Number(values.start_time),
            end_time: Number(values.end_time)
        })
        const res = await _addTest(this.state.fields);
    };
    render() {
        return (
            <div className='s-add'>
                <Form
                    initialValues={this.state.fields}
                    name="basic"
                    onFinish={this.onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="试卷名称"
                        name="title"
                        rules={[{ required: true, message: '请输入试卷名称!' }]}
                        style={{ marginBottom: '70px' }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="考试类型"
                        name='subject_id'
                        rules={[{ required: true, message: '请输入考试类型!' }]}
                        style={{ marginBottom: '70px' }}
                    >
                        <Select style={{ width: '120px' }}>
                            {
                                this.state.sub.map((item: any) => {
                                    return <Option value={item.subject_id} key={item.subject_id}>{item.subject_text}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="选择课程"
                        name='exam_id'
                        rules={[{ required: true, message: '请输入课程!' }]}
                        style={{ marginBottom: '70px' }}
                    >
                        <Select style={{ width: '120px' }}>
                            {
                                this.state.type.map((item: any) => {
                                    return <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name={['number']} label="设置题量" rules={[{ type: 'number', min: 0, max: 99 }]}>
                        <InputNumber />
                    </Form.Item>
                    <div className="s-time">
                        <Form.Item name="start_time" label="创建时间" >
                            <DatePicker />
                        </Form.Item>
                        <span>-</span>
                        <Form.Item name="end_time" >
                            <DatePicker />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            创建试卷
                       </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default ContentBox({
    title: '创建试卷',
    Module: ExamEdit
})

