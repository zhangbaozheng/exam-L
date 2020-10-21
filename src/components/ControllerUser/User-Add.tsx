import React, { Component } from "react";
import { FormInstance } from "antd/lib/form";
import { Form, Input, Button, Select, message } from "antd";
import { _userAdd, _identity, _updateUser, _updateUsers } from "@/api/userAdd";

const { Option } = Select;
interface Props {}
interface State {}

class UserAdd extends Component<Props, State> {
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
  onGenderChange = (value: string) => {
    this.formRef.current.setFieldsValue({
      note: `Hi, ${value === "male" ? "man" : "lady"}!`,
    });
  };
  //提交事件
  onFinish = (values: any) => {
    this.userAdd(values);
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
          {/**填写用户名*/}
          <Form.Item name="user_name">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          {/**填写密码*/}
          <Form.Item name="user_pwd">
            <Input placeholder="请输入密码" />
          </Form.Item>
          {/**填写身份id*/}
          <Form.Item name="identity_id">
            <Select
              placeholder="请选择身份id"
              onChange={this.onGenderChange}
              allowClear
            >
              {this.state.idData.map((item: any, index: number) => {
                return (
                  <Option value={item.identity_id} key={index}>
                    {item.identity_text}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          >
            {({ getFieldValue }) => {
              return getFieldValue("gender") === "other" ? (
                <Form.Item
                  name="customizeGender"
                  label="Customize Gender"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              ) : null;
            }}
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
  }
  //添加用户
  async userAdd(values: any) {
    let result = await _userAdd(values);
    if (
      values.user_name === undefined &&
      values.user_pwd === undefined &&
      values.identity_id === undefined
    ) {
     return message.error("内容不能为空");
    }
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
  //获取身份id信息
  async identity() {
    let result = await _identity();
    this.setState({
      idData: result.data.data,
    });
  }
}

export default UserAdd;
