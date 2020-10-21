import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'

import { _getRoomList, _gradeRoomDel, _gradeRoomAdd } from '@/api/grade'
import { Table, Space, message, Button, Modal, Form, Input } from 'antd';



interface Props {

}
interface State {
    columns: any,
    data: any,
    visible: boolean,
    layout: any,
    tailLayout: any,
}

class Room extends Component<Props, State> {
    state: any = {
        columns: [
            {
                title: '教室號',
                dataIndex: 'room_text',
                key: 'room_text',
            },
            {
                title: '操作',
                key: 'action',
                render: (text: any, record: { name: React.ReactNode; }) => (
                    <Space size="middle">
                        <span onClick={() => { this.gradeRoomDel(record) }}>删除</span>
                    </Space>
                ),
            },
        ],
        data: [],
        visible: false,//modal弹框
        layout: {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        },
        tailLayout: {
            wrapperCol: { offset: 8, span: 16 },
        },
    }

    componentDidMount() {
        this.getRoomList()
    }
    //教室信息
    async getRoomList() {
        const res = await _getRoomList();
        // console.log(res)
        if (res.data.code) {
            this.setState({
                data: res.data.data
            })
        }
    }

    //删除教室
    async gradeRoomDel(record: any) {
        // console.log(record.room_id)
        const res = await _gradeRoomDel(record.grade_id);
        // console.log(res.data)
        if (res.data.code) {
            this.getRoomList()
            message.info('删除成功');
        } else {
            message.info('删除失败');
        }
    }

    //点击添加班级或修改显示弹框
    showModal() {
        this.setState({
            visible: true,
        });
    };

    //点击提交
    async onFinish(values: any) {
        // console.log(values)
        const res = await _gradeRoomAdd(values);
        // console.log(res)
        if (res.data.code) {
            this.setState({
                visible: false,
            });
            this.getRoomList();
        }
    };

    //点击弹框x
    handleCancel = (e: any) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    };
    cancel() {
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={() => { this.showModal() }} style={{margin:'15px'}}>
                    +添加教室
                </Button>
                {/* 弹框 */}
                <Modal
                    title={this.state.title}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form
                        {...this.state.layout}
                        name="basic"
                        initialValues={this.state.red}
                        onFinish={(values) => { this.onFinish(values) }}
                    >

                        <Form.Item
                            label="教室号"
                            name="room_text"
                            rules={[{ required: true, message: '选择教室号!' }]}
                            style={{marginRight:'100px'}}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item {...this.state.tailLayout}>
                            <Button type="primary" htmlType="submit" onClick={() => { this.cancel() }} style={{marginRight:'20px'}}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                提交
                           </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Table columns={this.state.columns} dataSource={this.state.data} rowKey='room_id' />
            </div>
        )
    }
}

export default ContentBox({
    title: '教室管理',
    Module: Room
})
