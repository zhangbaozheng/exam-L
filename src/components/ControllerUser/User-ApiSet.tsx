import React, { Component } from "react";
import { FormInstance } from "antd/lib/form";
import { _userIdentity, _userAuthority, _userSetApi } from "@/api/userAdd";
import { Form, Button, Select, message } from "antd";

const { Option } = Select;
interface Props {}
interface State {}

class ApiSetUser extends Component<Props, State> {
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
    viewData: [],
    AuthData: [],
    userInfo: "",
  };
  onGenderChange = (value: string) => {
    this.formRef.current.setFieldsValue({
      note: `Hi, ${value === "male" ? "man" : "lady"}!`,
    });
  };
  //提交事件
  onFinish = (values: object) => {
    this.userSetApi(values);
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
          <Form.Item name="identity_id">
            <Select
              placeholder="请选择身份id"
              onChange={this.onGenderChange}
              allowClear
            >
              {this.state.viewData.map((item: any, index: number) => {
                return (
                  <Option value={item.identity_id} key={index}>
                    {item.identity_text}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {/**选择api接口权限*/}
          <Form.Item name="api_authority_id">
            <Select
              placeholder="请选择api接口权限"
              onChange={this.onGenderChange}
              allowClear
            >
              {this.state.AuthData.map((item: any, index: number) => {
                return (
                  <Option value={item.api_authority_id} key={index}>
                    {item.api_authority_text}
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
    this.userIdentity();
    this.userAuthority();
  }
  //获取身份数据
  async userIdentity() {
    let result = await _userIdentity();
    this.setState({
      viewData: result.data.data,
    });
  }
  //获取所有考试数据
  async userAuthority() {
    let result = await _userAuthority();
    this.setState({
      AuthData: result.data.data,
    });
  }
  //设置数据
  async userSetApi(value: object) {
    let result = await _userSetApi(value);
    switch (result.data.code) {
      case 0: {
        message.error(result.data.msg);
        break;
      }
      case 1: {
        message.success(result.data.msg);
        break;
      }
    }
  }
}

export default ApiSetUser;
