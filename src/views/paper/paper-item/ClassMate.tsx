import React, { Component } from 'react';
import { Table, Tag, Space } from 'antd';
import { _getExamList } from '@/api/exam'
interface IProps{
    history:any
}
class ClassMate extends Component<IProps> {
    state={
        columns:[
            {
              title: '班级',
              dataIndex: 'grade_name',
              key:'grade_name',
            },
            {
              title: '姓名',
              dataIndex: 'student_name',
              key: 'student_name',
            },
            {
              title: '阅卷状态',
              key: 'status',
              render: (text:any, record:any) => (
                <Space size="middle">
                  <span>{record.status===0?'未阅':'已阅'}</span>
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
              render: (text:any, record:any) => (
                <Space size="middle">
                    
                  <a onClick={()=>{this.props.history.push({
                      pathname:`/index/paper/detail/${record.exam_student_id}`,
                      state:{
                        grade_id:record.grade_id,
                        grade_name:record.grade_name,
                        exam_exam_id:record.exam_exam_id,
                        exam_student_id:record.exam_student_id
                        }
                  })}}>批卷</a>
                </Space>
              ),
            },
          ],
        data:[]
    }
    render() {
       
        return (
            <div>
                
                 <Table columns={this.state.columns} dataSource={this.state.data} />
            </div>
        );
    }
    componentDidMount(){
        if(this.props.history.location.query){
            let id = this.props.history.location.query.grade_id
            this.getExamList(id)
        }
        
    }
    async getExamList(id:string){ //拿试卷列表
        
        const result = await _getExamList({grade_id:id})
        if(result.data.code === 1){

            this.setState({
                data:result.data.exam.map((item:any,index:number)=>{return {...item,key:index,grade_name:this.props.history.location.query.grade_name}})
            })
        }

    }
}

export default ClassMate;