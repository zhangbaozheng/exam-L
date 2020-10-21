

import React, { Component } from 'react';
import ContentBox from '@/components/ContentBox'
import { Table, Space, Select,Button } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import { _getExamList } from '@/api/exam';
import { _getGradeList } from '@/api/grade';
const { Option } = Select;
interface IProps {
    history: any
}
interface State {

}

class ExamPaperClassmate extends Component<IProps, State> {
    state = {
        columns: [
            {
                title: '班级',
                dataIndex: 'grade_name',
                key: 'grade_name',
            },
            {
                title: '姓名',
                dataIndex: 'student_name',
                key: 'student_name',
            },
            {
                title: '阅卷状态',
                key: 'status',
                render: (text: any, record: any) => (
                    <Space size="middle">
                        <span>{record.status === 0 ? '未阅' : '已阅'}</span>
                    </Space>
                ),
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time',
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time',
            },
            {
                title: '操作',
                key: 'action',
                render: (text: any, record: any) => (
                    <Space size="middle">

                        <a onClick={() => {

                            this.props.history.push({
                                pathname: `/index/ExaminationPapers/${record.exam_student_id}`,
                                state: {
                                    grade_id: record.grade_id,
                                    grade_name: record.grade_name,
                                    exam_exam_id: record.exam_exam_id,
                                    exam_student_id: record.exam_student_id
                                }
                            })
                        }}>批卷</a>
                    </Space>
                ),
            },
        ],
        data: [], //表格信息
        mangerData:[], //班级数据
        status:0, //阅卷状态
        mangerName:null, //阅卷班级
        className:null //班级名称
    }
    render() {

        return (
            <div>
                <div className="zst-examSearch">
                    
                    <Select style={{ width: 120 }} onChange={(val)=>{this.handleChangeStatus(val)}}>
                        <Option value="all">全部</Option>
                        <Option value="0">未阅</Option>
                        <Option value="1">已阅</Option>
                    </Select>
                    <Select style={{ width: 120 }} onChange={(val,item)=>{this.handleChange(val,item)}}>
                       {
                           this.state.mangerData.map((item:any,index:number)=>{
                           return <Option key={index} value={item.grade_id}>{item.grade_name}</Option>
                           })
                       }
                    </Select>
                    <Button type="primary" onClick={()=>{this.findStudent()}}><SearchOutlined />查询</Button>
                </div>
                <Table columns={this.state.columns} dataSource={this.state.data} />
            </div>
        );
    }
    handleChangeStatus(value:any){ //更改阅卷状态
        this.setState({
            status:Number(value) 
        })
    }
    handleChange(value:any,item:any) {  //更改班级
        this.setState({
            mangerName:value,
            className:item.children
        })
      }
    async findStudent(){ //按条件查找学生
        
        const result = await _getExamList({ grade_id: this.state.mangerName,status:this.state.status })
 
        if(result.data.code === 1){
            this.setState({
                data:result.data.exam.map((item: any, index: number) => { return { ...item, key: index, grade_name: this.state.className } })
            })
        }
    }
    componentDidMount() {
        if (this.props.history.location.query) {
            let id = this.props.history.location.query.grade_id
            this.getExamList(id)
        }
        this.getGrade()

    }
    async getGrade(){ //拿班级信息
        const result = await _getGradeList()
        if(result.data.code === 1){
            this.setState({
                mangerData:result.data.data
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