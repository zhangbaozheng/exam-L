import { Tabs } from "antd";
import React, { Component } from "react";
import { FormInstance } from "antd/lib/form";
import { Form, Input, Button, Select, message } from "antd";
import { _userAdd, _identity, _updateUser, _updateUsers } from "@/api/userAdd";

const { Option } = Select;
const { TabPane } = Tabs;
interface Props {}
interface State {}

export default class userAdd extends Component<Props, State> {
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
      wrapperCol: { offset: 0, span: 16 },
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
    this.updateUsers(values)
  };
  //重置事件
  onReset = () => {
    this.formRef.current.resetFields();
  };
  callback: ((activeKey: string) => void) | undefined;
  render() {
    return (
      <div className="addUser_main">
        <h2>添加用户</h2>
        <div className="userAdd">
          <div className="addTabs">
            <Form
              {...this.state.layout}
              ref={this.formRef}
              name="control-ref"
              onFinish={this.onFinish}
            >
              <Tabs onChange={this.callback} type="card">
                <TabPane tab="添加用户" key="1">
                  <Form.Item name="user_name" rules={[{ required: true }]}>
                    <Input placeholder="请输入用户名" />
                  </Form.Item>
                  <Form.Item name="user_pwd" rules={[{ required: true }]}>
                    <Input placeholder="请输入密码" />
                  </Form.Item>
                  <Form.Item name="identity_id" rules={[{ required: true }]}>
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
                </TabPane>
                <TabPane tab="更新用户" key="2">
                  {/**用户选择 */}
                  <Form.Item name="user_id" rules={[{ required: true }]}>
                    <Select
                      placeholder="请选择身份id"
                      onChange={this.onGenderChange}
                      allowClear
                    >
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
                  <Form.Item name="user_name" rules={[{ required: true }]}>
                    <Input placeholder="请输入用户名" />
                  </Form.Item>
                  {/**填写密码*/}
                  <Form.Item name="user_pwd" rules={[{ required: true }]}>
                    <Input placeholder="请输入密码" />
                  </Form.Item>
                  {/**用户身份选择 */}
                  <Form.Item name="identity_id" rules={[{ required: true }]}>
                    <Select
                      placeholder="请选择身份id"
                      onChange={this.onGenderChange}
                      allowClear
                    >
                      {this.state.idData.map((item: any, index: number) => {
                        console.log(item);
                        return (
                          <Option value={item.identity_id} key={index}>
                            {item.identity_text}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </TabPane>
              </Tabs>
              <Form.Item {...this.state.tailLayout}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
                <Button htmlType="button" onClick={this.onReset}>
                  重置
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.identity();
    this.updateUser();
  }
  //添加用户
  async userAdd(values: object) {
    let result = await _userAdd(values);
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
  //更新用户信息
  async updateUser() {
    let result = await _updateUser();
    this.setState({
      updateData: result.data.data,
    });
  }
  //更新
  async updateUsers(values:object) {
    let result = await _updateUsers(values);
    if(result.data.code) {
      message.success(result.data.msg);
    }
  }
}
