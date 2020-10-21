import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'
import { _getStudentList, _gradeStudentDel, _getGradeList, _getRoomList } from '@/api/grade'
import { Table, Space, message, Button, Input, Select } from 'antd';
const { Option } = Select;


interface Props {

}
interface State {
    columns: any,
    data: any,
    gradeData: any,
    roomData: any
}

class Student extends Component<Props, State> {
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
                        <a onClick={() => { this.gradeRoomDel(record) }}>删除</a>
                    </Space>
                ),
            },
        ],
        data: [],
        roomData: [],
        gradeData: []

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
    async gradeRoomDel(record: any) {
        // console.log(record.student_id)
        const res = await _gradeStudentDel(record.student_id);
        // console.log(res.data)
        if (res.data.code) {
            this.getStudentList()
            message.info('删除成功');
        } else {
            message.info('删除失败');
        }
    }

    onChange(value: any) {
        // console.log(`selected ${value}`);
    }

    onBlur() {
        // console.log('blur');
    }

    onFocus() {
        // console.log('focus');
    }

    onSearch(val: any) {
        // console.log('search:', val);
    }

    async getGradeList() {
        const res = await _getGradeList();
        // console.log(res)
        if (res.data.code) {
            this.setState({
                gradeData: res.data.data
            })
        }
    }
    async getRoomList() {
        const res = await _getRoomList();
        if (res.data.code) {
            this.setState({
                roomData: res.data.data
            })
        }
    }





    render() {
        return (
            <div>
                <h2 style={{ fontWeight: 'bold', fontSize: '24px' }}>学生管理</h2>
                <div>
                    <Input placeholder="输入学生姓名" style={{ width: 200 }} />
                    <Select
                        showSearch
                        style={{ width: 200, margin: '20px' }}
                        placeholder="请选择教室号"
                        optionFilterProp="children"
                        onChange={this.onChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onSearch={this.onSearch}
                        filterOption={(input, option: any) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            this.state.roomData.map((item: any, index: number) => {
                                return <Option value={item.room_text} key={index}>{item.room_text}</Option>
                            })
                        }
                    </Select>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="班级名"
                        optionFilterProp="children"
                        onChange={this.onChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onSearch={this.onSearch}
                        filterOption={(input, option: any) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            this.state.gradeData.map((item: any, index: number) => {
                                return <Option value={item.grade_name} key={index}>{item.grade_name}</Option>
                            })
                        }
                    </Select>
                    <Button type="primary" style={{ margin: '20px' }}>搜索</Button>
                    <Button type="primary">重置</Button>
                </div>
                <Table columns={this.state.columns} dataSource={this.state.data} rowKey='student_id' />
            </div>
        )
    }
}

export default ContentBox({
    title: '学生管理',
    Module: Student
})
