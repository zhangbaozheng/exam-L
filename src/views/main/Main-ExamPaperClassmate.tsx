import React, { Component } from 'react';
import ContentBox from '@/components/ContentBox';
import { Table, Space, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table/index';
import { _getGradeList } from '@/api/grade';
import { _getExamList } from '@/api/exam';
import { timeChange } from '@/utils';

const { Option } = Select;
interface IProps {
    history: any
}
interface IState {
    [key: string]: any
    data: any[]
    mangerData: any[]
    status: any
    columns?: ColumnsType<any> | undefined
}

class ExamPaperClassmate extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            columns: [
                {
                    title: '班级',
                    dataIndex: 'grade_name',
                    key: 'grade_name',
                    align: 'center',
                },
                {
                    title: '姓名',
                    dataIndex: 'student_name',
                    key: 'student_name',
                    align: 'center'
                },
                {
                    title: '阅卷状态',
                    key: 'status',
                    align: 'center',
                    render: (text: any, record: any) => (
                        <Space size="middle">
                            <span>{record.status === 0 ? '未阅' : '已阅'}</span>
                        </Space>
                    ),
                },
                {
                    title: '开始时间',
                    key: 'start_time',
                    align: 'center',
                    render: (text: any, record: any) => (
                        <Space size="middle">
                            <span>{timeChange(record.start_time)}</span>
                        </Space>
                    ),
                },
                {
                    title: '结束时间',
                    key: 'end_time',
                    align: 'center',
                    render: (text: any, record: any) => (
                        <Space size="middle">
                            <span>{timeChange(record.end_time)}</span>
                        </Space>
                    ),
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (text: any, record: any) => (
                        <Space size="middle">

                            <span style={{ color: '#1890FF' }} onClick={() => {

                                this.props.history.push({
                                    pathname: `/index/ExaminationPapers/${record.exam_student_id}`,
                                    state: {
                                        grade_id: record.grade_id,
                                        grade_name: record.grade_name,
                                        exam_exam_id: record.exam_exam_id,
                                        exam_student_id: record.exam_student_id
                                    }
                                })
                            }}>批卷</span>
                        </Space>
                    ),
                },
            ],
            data: [], //表格信息
            mangerData: [], //班级数据
            status: 0, //阅卷状态
            mangerName: null, //阅卷班级
            className: null //班级名称
        }
    }

    render() {
        return (
            <div>
                <div className="zst-examSearch">

                    <Select style={{ width: 120 }} onChange={(val) => { this.handleChangeStatus(val) }}>
                        <Option value="2">全部</Option>
                        <Option value="0">未阅</Option>
                        <Option value="1">已阅</Option>
                    </Select>
                    <Select style={{ width: 120 }} onChange={(val, item) => { this.handleChange(val, item) }}>
                        {
                            this.state.mangerData.map((item: any, index: number) => {
                                return <Option key={index} value={item.grade_id}>{item.grade_name}</Option>
                            })
                        }
                    </Select>
                    <Button type="primary" onClick={() => { this.findStudent() }}><SearchOutlined />查询</Button>
                </div>
                <Table columns={this.state.columns} dataSource={this.state.data} />
            </div>
        );
    }
    componentDidMount() {
        if (this.props.history.location.query) {
            let id = this.props.history.location.query.grade_id
            this.getExamList(id)
        }
        this.getGrade()
    }
    handleChangeStatus(value: any) { //更改阅卷状态
        this.setState({
            status: Number(value)
        })
    }
    handleChange(value: any, item: any) {  //更改班级
        this.setState({
            mangerName: value,
            className: item.children
        })
    }
    async findStudent() { //按条件查找学生
        if (this.state.status === 2) {
            const result = await _getExamList({ grade_id: this.state.mangerName })
            this.judge(result)
        } else {
            const result = await _getExamList({ grade_id: this.state.mangerName, status: this.state.status })
            this.judge(result)
        }
    }
    judge(result: any) { //通过选择的阅卷状态进行判断
        if (result.data.code === 1) {
            this.setState({
                data: result.data.exam.map((item: any, index: number) => { return { ...item, key: index, grade_name: this.state.className } })
            })
        }
    }
    async getGrade() { //拿班级信息
        const result = await _getGradeList()
        if (result.data.code === 1) {
            this.setState({
                mangerData: result.data.data
            })
        }
    }
    async getExamList(id: string) { //拿试卷列表

        const result = await _getExamList({ grade_id: id })
        if (result.data.code === 1) {

            this.setState({
                data: result.data.exam.map((item: any, index: number) => { return { ...item, key: index, grade_name: this.props.history.location.query.grade_name } })
            })
        }

    }
}

export default ContentBox({
    title: '待批试卷',
    Module: ExamPaperClassmate
})