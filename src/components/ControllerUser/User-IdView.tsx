import React, { Component } from "react";
import { FormInstance } from "antd/lib/form";
import { Form, Button, Select, message } from "antd";
import { _userIdentity, _view_authority, _userSetApiView } from "@/api/userAdd";

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
  //提交事件
  onFinish = (values: object) => {
    this.userSetApiView(values);
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
          {/**选择身份id*/}
          <Form.Item name="identity_id">
            <Select placeholder="请选择身份id" allowClear>
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
          <Form.Item name="view_authority_id">
            <Select placeholder="请选择api接口权限" allowClear>
              {this.state.AuthData.map((item: any, index: number) => {
                return (
                  <Option value={item.view_authority_id} key={index}>
                    {item.view_authority_text}
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
    let result = await _view_authority();
    console.log(result);
    this.setState({
      AuthData: result.data.data,
    });
  }
  //设置数据视图
  async userSetApiView(value: any) {
    if (
      value.identity_id === undefined &&
      value.view_authority_id === undefined
    ) {
      return message.error("内容不能为空");
    }
    let result = await _userSetApiView(value);
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
