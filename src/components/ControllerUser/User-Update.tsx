import React, { Component } from "react";
import { FormInstance } from "antd/lib/form";
import { Form, Input, Button, Select, message } from "antd";
import { _identity, _updateUser, _updateUsers } from "@/api/userAdd";

const { Option } = Select;
interface Props {}
interface State {}

class UpdateUser extends Component<Props, State> {
  formRef: any;
  constructor(props: Props) {
    super(props);
    this.formRef = React.createRef<FormInstance>();
  }
  state = {
    layout: {
      labelCol: { span: 20 },
      wrapperCol: { span: 18 },
    },
    tailLayout: {
      wrapperCol: { offset: 0, span: 20 },
    },
    idData: [],
    updateData: [],
  };
  //提交事件
  onFinish = (values: object) => {
    this.updateUsers(values);
  };
  //重置事件
  onReset = () => {
    this.formRef.current.resetFields();
  };
  callback: ((activeKey: string) => void) | undefined;
  render() {
    return (
      <>
        <Form
          {...this.state.layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={this.onFinish}
        >
          {/**用户选择 */}
          <Form.Item name="user_id" rules={[{ required: true }]}>
            <Select placeholder="请选择身份id" allowClear>
              {this.state.updateData.map((item: any, index: number) => {
                return (
                  <Option value={item.user_id} key={index}>
                    {item.user_name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {/**填写用户名*/}
          <Form.Item name="user_name">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          {/**填写密码*/}
          <Form.Item name="user_pwd">
            <Input placeholder="请输入密码" />
          </Form.Item>
          {/**用户身份选择 */}
          <Form.Item name="identity_id">
            <Select placeholder="请选择身份id" allowClear>
              {this.state.idData.map((item: any, index: number) => {
                return (
                  <Option value={item.identity_id} key={index}>
                    {item.identity_text}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item {...this.state.tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="button" onClick={this.onReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
  componentDidMount() {
    this.identity();
    this.updateUser();
  }
  //获取身份id信息
  async identity() {
    let result = await _identity();
    this.setState({
      idData: result.data.data,
    });
  }
  //更新用户信息
  async updateUser() {
    let result = await _updateUser();
    this.setState({
      updateData: result.data.data,
    });
  }
  //更新
  async updateUsers(values: object) {
    let result = await _updateUsers(values);
    if (result.data.code) {
      message.success(result.data.msg);
    }
  }
}

export default UpdateUser;
