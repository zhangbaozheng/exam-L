import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'
import { _getGradeList, _gradeListDel, _gradeListAdd, _gradeListEdit } from '@/api/grade'
import { Table, Space, message, Button, Modal, Form, Input, Select } from 'antd';
const { Option } = Select;

interface Props {

}
interface State {
    columns: any,
  data: any,
  visible: boolean,
  title: string,
  num: number,
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
            render: (text: React.ReactNode) => <a>{text}</a>,
          },
          {
            title: '課程名',
            dataIndex: 'subject_text',
            key: 'subject_text',
          },
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
                <a onClick={() => { this.showModal(2, record) }}>修改</a>
                <a onClick={() => { this.gradeListDel(record) }}>删除</a>
              </Space>
            ),
          },
        ],
        data: [],
        visible: false,//modal弹框
        title: '+添加班级',
        // num:1,//添加和修改的标识
        red: '',//点击编辑时该商品的所有项
        layout: {
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
        },
        tailLayout: {
          wrapperCol: { offset: 8, span: 16 },
        },
        room_id: '',
        subject_id: '',
        grade_id: '',
      }

    componentDidMount() {
        this.getGradeList()
    }
    //班级信息
    async getGradeList() {
        const res = await _getGradeList();
        // console.log(res.data.data)
        if (res.data.code) {
            this.setState({
                data: res.data.data
            })
        }
    }
    //删除班级
    async gradeListDel(record: any) {
        // console.log(record)
        const res = await _gradeListDel(record.grade_id);
        // console.log(res.data)
        if (res.data.code) {
          this.getGradeList()
          message.info('删除成功');
        } else {
          message.info('删除失败');
        }
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

  //获取room_id和subject_id
  getId(value: any, option: any) {
    // console.log(value,option)
    this.setState({
      room_id: option.item.room_id,
      subject_id: option.item.subject_id,
      grade_id: option.item.grade_id,
    })
  }

  //点击提交
  async onFinish(values: any) {
    let obj = {
      grade_name: values.grade_name,
      room_id: this.state.room_id,
      subject_id: this.state.subject_id,
      grade_id: this.state.grade_id
    }
    if (this.state.title === '添加班级') {
      const res = await _gradeListAdd(obj);
      if (res.data.code) {
        this.setState({
          visible: false,
        });
        this.getGradeList();
      }
    }
    if (this.state.title === '修改班级') {
      const res = await _gradeListEdit(obj);
      // console.log(res)
      if (res.data.code) {
        this.setState({
          visible: false,
        });
        this.getGradeList();
      }
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
        <Button type="primary" onClick={() => { this.showModal(1, null) }}>
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
                onChange={(value, option) => { this.getId(value, option) }}
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

            <Form.Item {...this.state.tailLayout}>
              <Button type="primary" htmlType="submit" onClick={() => { this.cancel() }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Table columns={this.state.columns} dataSource={this.state.data} rowKey='grade_id'/>
      </div>
    )
  }
}


export default ContentBox({
    title: '班级管理',
    Module: Grade
})
