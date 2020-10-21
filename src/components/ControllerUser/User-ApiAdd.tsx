import React, { Component } from "react";
import { FormInstance } from "antd/lib/form";
import { _userApiEdit } from "@/api/userAdd";
import { Form, Input, Button, message } from "antd";
interface Props {}
interface State {}

class IdUserAdd extends Component<Props, State> {
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
  onFinish = (values: object) => {
    this.userApiEdit(values);
  };
  //重置事件
  onReset = () => {
    this.formRef.current.resetFields();
  };
  render() {
    return (
      <>
        <Form
          {...this.state.layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={this.onFinish}
        >
          {/**填写api接口权限名称*/}
          <Form.Item name="api_authority_text">
            <Input placeholder="请输入api接口权限名称" />
          </Form.Item>
          {/**填写api接口权限url*/}
          <Form.Item name="api_authority_url">
            <Input placeholder="请输入api接口权限url" />
          </Form.Item>
          {/**填写api接口权限方法*/}
          <Form.Item name="api_authority_method">
            <Input placeholder="请输入api接口权限方法" />
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
  async userApiEdit(values: any) {
    try {
      //判断内容为空
      if (
        values.api_authority_url === undefined &&
        values.api_authority_text === undefined &&
        values.api_authority_method === undefined
      ) {
        return message.error("内容不能为空");
      }
      let result = await _userApiEdit(values);
      switch (result.data.code) {
        //用户重复
        case 0: {
          message.error(result.data.msg);
          break;
        }
        case 1: {
          //添加成功
          message.success(result.data.msg);
          break;
        }
      }
    } catch (e) {}
  }
}

export default IdUserAdd;
