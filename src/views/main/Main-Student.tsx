import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'
import { _getStudentList, _gradeStudentDel, _getGradeList, _getRoomList } from '@/api/grade'
import { Table, Space, message, Button, Input, Select, Form, Popconfirm } from 'antd';
import { FormInstance } from 'antd/lib/form';
const { Option } = Select;


interface Props {

}
interface State {
    columns: any,
    data: any,
    gradeData: any,
    roomData: any,
    searchList: any,
    isFlag: boolean,
    isShow: boolean,

}

class Student extends Component<Props, State> {
    formRef = React.createRef<FormInstance>();
    state: any = {
        columns: [
            {
                title: '姓名',
                dataIndex: 'student_name',
                key: 'student_name',
            },
            {
                title: '学号',
                dataIndex: 'student_id',
                key: 'student_id',
            },
            {
                title: '班级',
                dataIndex: 'grade_name',
                key: 'grade_name',
            },
            {
                title: '教室',
                dataIndex: 'room_text',
                key: 'room_text',
            },
            {
                title: '密码',
                dataIndex: 'student_pwd',
                key: 'student_pwd',
            },
            {
                title: '操作',
                key: 'action',
                render: (text: any, record: { name: React.ReactNode; }) => (
                    <Space size="middle">
                        <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => { this.confirm(record) }}> <span>删除</span></Popconfirm>
                    </Space>
                ),
            },
        ],
        data: [],
        roomData: [],
        gradeData: [],
        searchList: [],//搜索结果列表
        isFlag: true,//控制第一个table的显示隐藏
        isShow: false,//控制第二个table的显示隐藏
        layout: {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        },
        tailLayout: {
            wrapperCol: { offset: 8, span: 16 },
        },
        arr: [//提取出两个select框中不同的项
            {
                name: 'room_text',
                placeholder: '教室号',
                list: 'roomData'
            },
            {
                name: 'grade_name',
                placeholder: '班级名',
                list: 'gradeData'
            }
        ],
    }
 
    componentDidMount() {
        this.getStudentList();
        this.getGradeList();
        this.getRoomList();
    }
    //学生数据信息
    async getStudentList() {
        const res = await _getStudentList();
        // console.log(res)
        if (res.data.code) {
            this.setState({
                data: res.data.data
            })
        }
    }

    //删除学生
    async confirm(record: any) {  
        try {
            const res = await _gradeStudentDel(record.student_id);
            if (res.data.code) {
                this.getStudentList()
                return message.success('删除成功');
            }
            message.error('删除失败');
        } catch (error) {}
    }

    //班级下拉列表内容
    async getGradeList() {
        const res = await _getGradeList();
        // console.log(res)
        if (res.data.code) {
            this.setState({
                gradeData: res.data.data
            })
        }
    }

    //教室下拉列表内容
    async getRoomList() {
        const res = await _getRoomList();
        // console.log(res)
        if (res.data.code) {
            this.setState({
                roomData: res.data.data
            })
        }
    }

    //点击搜索    
    onFinish = (values: any) => {
        // console.log(values);
        let result = [];
        result = this.state.data.filter((item: any) => {
            if (values.student_name !== undefined) {
                return item.student_name.includes(values.student_name)
            } else if (values.room_text !== undefined) {
                return item.room_text.includes(values.room_text)
            } else if (values.grade_name !== undefined) {
                return item.grade_name.includes(values.grade_name)
            }
            return values
        })

        this.setState({
            searchList: result,
            isFlag: false,
            isShow: true
        })
    };

    //点击重置
    onReset = () => {
        //   console.log(this.formRef)
        this.formRef.current && this.formRef.current.resetFields();
    };

    

    render() {
        return (
            <div>
                <Form {...this.state.layout} ref={this.formRef} name="control-hooks" onFinish={this.onFinish} style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Item name="student_name" label="">
                        <Input placeholder="输入学生姓名" style={{ width: 200, marginLeft: '20px' }} />
                    </Form.Item>
                    {
                        this.state.arr.map((item: any, ind: number) => {
                            return <Form.Item name={item.name} label="" key={ind + 'select'}>
                                <Select
                                    showSearch
                                    style={{ width: 200, margin: '20px' }}
                                    placeholder={item.placeholder}
                                    optionFilterProp="children"
                                >
                                    {
                                        this.state[item.list].map((val: any, index: number) => {
                                            return <Option value={val[item.name]} key={index + 'selectOption'}>{val[item.name]}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        })
                    }

                    <Form.Item {...this.state.tailLayout} style={{ width: 300, display: 'flex', alignItems: 'center' }}>
                        <Button type="primary" htmlType="submit" >
                            搜索
                        </Button>
                        <Button type="primary" htmlType="button" onClick={() => { this.onReset() }} style={{ marginLeft: '20px' }}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
                <Table columns={this.state.columns} dataSource={this.state.data} rowKey='student_id' style={{ display: this.state.isFlag ? 'block' : 'none' }} />
                <Table columns={this.state.columns} dataSource={this.state.searchList} rowKey='student_id' style={{ display: this.state.isShow ? 'block' : 'none' }} />
            </div>
        )
    }
}

export default ContentBox({
    title: '学生管理',
    Module: Student
})
