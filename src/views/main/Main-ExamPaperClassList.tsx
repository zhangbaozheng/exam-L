

import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'
import { Table, Space } from 'antd';
import { _getGradeList } from '@/api/grade'

interface Props {
    history: any
}
interface State {

}

class ExamPaperClassList extends Component<Props, State> {
    state = {
        columns: [
            {
                title: '班级名',
                dataIndex: 'grade_name',
                key: 'grade_name',
            },
            {
                title: '课程名称',
                dataIndex: 'subject_text',
                key: 'subject_text',
            },
            {
                title: '阅卷状态',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '课程名称',
                dataIndex: 'subject_text',
                key: 'subject_text',
            },
            {
                title: '班级号',
                dataIndex: 'room_text',
                key: 'room_text',
            },
            {
                title: '操作',
                key: 'action',
                render: (text: any, record: any) => (
                    <Space size="middle">
                        <a onClick={() => {
                            this.props.history.push({
                                pathname: '/index/ExamPaperClassmate',
                                query: {
                                    grade_id: record.grade_id,
                                    grade_name: record.grade_name
                                }
                            })
                        }}>批卷</a>
                    </Space>
                ),
            },
        ],
        data: []
    }
    render() {
        return (
            <div>
                <Table columns={this.state.columns} dataSource={this.state.data} />
            </div>
        );
    }
    componentDidMount() {
        this.getData()
    }
    async getData() {
        const result = await _getGradeList();
        if (result.data.code === 1) {
            this.setState({
                data: result.data.data.map((item: any, index: number) => { return { ...item, key: index } })
            })
        }
    }
}

export default ContentBox({
    title: '批卷班级',
    Module: ExamPaperClassList
})