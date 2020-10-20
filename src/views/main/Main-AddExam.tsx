import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'
import { Form, Input, Button, Select, DatePicker } from 'antd'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

interface Props {
  
}
interface State {
  
}

class AddExam extends Component<Props, State> {
    render() {
        //  const { getFieldProps } = this.props.form;
        return (
            <div className='s-add'>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="试卷名称"
                        name="name"
                        rules={[{ required: true, message: '请输入试卷名称!' }]}
                        style={{ marginBottom: '70px' }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="选择考试类型"
                        name='type'
                        rules={[{ required: true, message: '请输入考试类型!' }]}
                        style={{ marginBottom: '70px' }}
                    >
                        <Select style={{ width: '120px' }}></Select>
                    </Form.Item>
                    <Form.Item
                        label="选择课程"
                        name='class'
                        rules={[{ required: true, message: '请输入课程!' }]}
                        style={{ marginBottom: '70px' }}
                    >
                        <Select style={{ width: '120px' }}></Select>
                    </Form.Item>
                    <Form.Item
                        label="设置题量"
                        name='num'
                        rules={[{ required: true, message: '请输入题量!' }]}
                        style={{ marginBottom: '70px' }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="考试时间"
                        labelCol={{ span: 8 }}
                        required
                        style={{ marginBottom: '70px' }}
                    >
                        <DatePicker />
                        <span className="ant-form-split">-</span>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
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
    title: '添加考试',
    Module: AddExam
})