import React, { Component } from 'react';
import { Table, Space, message, Button,Modal } from 'antd';
import { _getGradeList, _gradeListDel } from '@/api/grade'

interface Props {

}
interface State {

}

export default class Grade extends Component<Props, State> {
  state = {
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
            <a>修改</a>
            <a onClick={() => { this.gradeListDel(record) }}>删除</a>
          </Space>
        ),
      },
    ],
    data: [],
    visible: false,//modal弹框
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
    console.log(record.grade_id)
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWduVGltZSI6MTYwMzExMzY5NDM4MiwidXNlcl9pZCI6ImZkamZyLW1zeHA4YSIsInVzZXJfbmFtZSI6ImhlaW5hbiIsImlkZW50aXR5X2lkIjoiNjNubzlwLTh5MGs0IiwiaWRlbnRpdHlfdGV4dCI6IueuoeeQhuWRmCIsImlhdCI6MTYwMzExMzY5NH0.SdSmbDKOQY2WmBzf8txMJ6gkbU9ts5r69DlKZEpNZu0'
    const res = await _gradeListDel(record.grade_id, token);
    // console.log(res.data)
    if(res.data.code){
      message.info('删除成功');
    }else{
      message.info('删除失败');
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e:any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e:any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
         <Button type="primary" onClick={this.showModal}>
          +添加班级
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <Table columns={this.state.columns} dataSource={this.state.data} />
      </div>
    )
  }
}