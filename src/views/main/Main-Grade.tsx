import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'
import { _getGradeList, _gradeListDel, _gradeListAdd, _gradeListEdit, _getRoomList, _getSubjectList } from '@/api/grade'
import { Table, Space, message, Button, Modal, Form, Input, Select, Popconfirm } from 'antd';
const { Option } = Select;

interface Props {

}
interface State {
  columns: any,
  data: any,
  visible: boolean,
  title: string,
  red: any,
  layout: any,
  tailLayout: any,
  room_id: string,
  subject_id: string,
  grade_id: string
}
class Grade extends Component<Props, State> {
  state: any = {
    columns: [
      {
        title: '班級',
        dataIndex: 'grade_name',
        key: 'grade_name',
        render: (text: React.ReactNode) => <span>{text}</span>,
      },
      {
        title: '课程名',
        dataIndex: 'subject_text',
        key: 'subject_text',
      },
      {
        title: '教室号',
        dataIndex: 'room_text',
        key: 'room_text',
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: { name: React.ReactNode; }) => (
          <Space size="middle">
            <span onClick={() => { this.showModal(2, record) }}>修改</span>
            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => { this.gradeListDel(record) }}>
               <span>删除</span>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    data: [],
    visible: false,//modal弹框
    title: '+添加班级',
    red: '',//点击编辑时该商品的所有项
    layout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    },
    tailLayout: {
      wrapperCol: { offset: 8, span: 16 },
    },
    room_id: '',//输入的教室号对应的教室id
    subject_id: '',//输入的课程名对应的id
    grade_id: '',//输入的班级名对应的id
  }

  componentDidMount() {
    this.getGradeList()
  }
  //班级信息
  async getGradeList() {
    const res = await _getGradeList();
    if (res.data.code) {
      this.setState({
        data: res.data.data
      })
    }
  }

  //删除班级
  async gradeListDel(record: any) {
    try {
      const res = await _gradeListDel(record.grade_id);
      if (res.data.code) {
        this.getGradeList()
        return message.success('删除成功');
      } 
      message.error('删除失败');
    } catch (error) {}
  }

  //点击添加班级或修改显示弹框
  showModal(num: number, record: any) {
    // console.log(record)
    this.setState({
      visible: true,
      title: num === 1 ? '添加班级' : '修改班级',
      red: record
    });
  };


  //点击提交
  async onFinish(values: any) {
    // console.log(values)

    //获取输入的教室名对应的id
    const roomRes = await _getRoomList()
    const roomArr = roomRes.data.data.filter((item: any) => {
      return item.room_text.includes(values.room_text)
    })
    roomArr.map((val: any) => {
      return this.setState({
        room_id: val.room_id
      })
    })

    //获取输入的课程名对应的id
    const subjectRes = await _getSubjectList()
    const subjectArr = subjectRes.data.data.filter((item: any) => {
      return item.subject_text.includes(values.subject_text)
    })
    subjectArr.map((val: any) => {
      return this.setState({
        subject_id: val.subject_id
      })
    })

    //获取输入的班级名对应的id
    const gradeArr = this.state.data.filter((item: any) => {
      return item.grade_name.includes(values.grade_name)
    })
    gradeArr.map((val: any) => {
      return this.setState({
        grade_id: val.grade_id
      })
    })

    let obj = {
      grade_name: values.grade_name,//输入的班级名
      room_id: this.state.room_id,//输入的教室号对应的id
      subject_id: this.state.subject_id,//输入的课程名对应的id
      grade_id: this.state.grade_id,//输入的班级名对应的id
    }

    if (this.state.title === '添加班级') {
      const res = await _gradeListAdd(obj);
      // console.log(res)
      if (res.data.code) {
        this.getGradeList();
        this.setState({
          visible: false,
        });
      }
    }
    if (this.state.title === '修改班级') {
      const res = await _gradeListEdit(obj);
      // console.log(res)
      if (res.data.code) {
        this.getGradeList();
        this.setState({
          visible: false,
        });
      }
    }
  };


  //点击弹框x
  handleCancel = (e: any) => {
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
        <Button type="primary" onClick={() => { this.showModal(1, null) }} style={{ margin: '15px' }}>
          +添加班级
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
              label="班级名"
              name="grade_name"
              rules={[{ required: true, message: '班级名' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="教室号"
              name="room_text"
              rules={[{ required: true, message: '选择教室号!' }]}
            >
              <Select
                placeholder="选择教室号"
                allowClear
              >
                {
                  this.state.data.map((item: any, index: number) => {
                    return <Option value={item.room_text} key={index} item={item}>{item.room_text}</Option>
                  })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="课程名"
              name="subject_text"
              rules={[{ required: true, message: '课程名!' }]}
            >
              <Select
                placeholder="课程名"
                allowClear
              >
                {
                  this.state.data.map((item: any, index: number) => {
                    return <Option value={item.subject_text} key={index} item={item}>{item.subject_text}</Option>
                  })
                }
              </Select>
            </Form.Item>

            <Form.Item {...this.state.tailLayout} style={{display:'flex',width:300}}>
              <Button type="primary" htmlType="submit" onClick={() => { this.cancel() }} style={{ marginRight: '10px' }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Table columns={this.state.columns} dataSource={this.state.data} rowKey='grade_id' />
      </div>
    )
  }
}


export default ContentBox({
  title: '班级管理',
  Module: Grade
})
