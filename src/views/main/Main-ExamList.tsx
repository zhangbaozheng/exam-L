import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'
import { Button, Select, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { _getTestList, _getTestSubject, _getTestType, _getTestDetail } from '@/api/exam'
const { Option } = Select;

function handleChange(value: string) {
    console.log(`selected ${value}`);
}
interface Props {
    history: any
}
interface State {

}
class ExamList extends Component<Props, State> {
    state = {
        data: [],
        type: [],
        sub: []
    }
    componentDidMount() {
        this.getTestList()
        this.getTestSubject()
        this.getTestType()

    }
    //班级信息
    async getTestList() {
        const res = await _getTestList();
        if (res.data.code) {
            this.setState({
                data: res.data.exam
            })
        }
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
    async getTestDetail(id: string) {
        const res = await _getTestDetail(id);
        if (res.data.code) {
            this.setState({
                sub: res.data.data
            })
        }
    }
    goDetail(exam_exam_id: string) {
        this.props.history.push({pathname:`/index/ExamDetail/${exam_exam_id}`,state:{exam_exam_id}})
    }

    render() {
        const columns = [
            {
                title: '试卷信息',
                dataIndex: 'title',
                key: 'title',
                fixed: 'left',
            },
            {
                title: '班级',
                dataIndex: 'grade_name',
                key: 'grade_name',
                fixed: 'left',
            },
            { title: '创建人', dataIndex: '', key: '1' ,render:()=><span>神秘人</span>},
            { title: '开始时间', dataIndex: 'start_time', key: 'start_time' },
            { title: '结束时间', dataIndex: 'end_time', key: 'end_time' },
            {
                title: '操作',
                key: '2',
                fixed: 'right',
                width: 100,
                render: (text: any, record: any) => <span onClick={() => this.goDetail(record.exam_exam_id)} className='s-xq'>详情</span>,
            },
        ];
        return (
            <div className='s-list'>
                <div className='s-search'>
                    <span className='s-span'>考试类型:</span>
                    <Select style={{ width: '180px', marginLeft: '30px' }} onChange={handleChange}>
                        {
                            this.state.type.map((item: any) => {
                                return <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                            })
                        }
                    </Select>
                    <span className='s-span'>课程:</span>
                    <Select style={{ width: '180px', marginLeft: '30px' }} onChange={handleChange}>
                        {
                            this.state.sub.map((item: any) => {
                                return <Option value={item.subject_id} key={item.subject_id}>{item.subject_text}</Option>
                            })
                        }
                    </Select>
                    <Button type="primary"><SearchOutlined />查询</Button>
                </div>
                <div className="s-list-box">
                    <p>试卷列表</p>
                    <Table columns={columns as any} dataSource={this.state.data} />
                </div>
            </div>
        )
    }
}

export default ContentBox({
    title: '试卷列表',
    Module: ExamList
})
