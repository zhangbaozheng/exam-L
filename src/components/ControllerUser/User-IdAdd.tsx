import React, { Component } from "react";
import { _userEdit } from "@/api/userAdd";
import { FormInstance } from "antd/lib/form";
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
  //提交事件
  onFinish = (values: any) => {
    this.userEdit(values.identity_text);
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
          {/**填写用户名*/}
          <Form.Item name="identity_text">
            <Input placeholder="请输入身份名称" />
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
  async userEdit(values: string) {
    try {
      if (values === undefined) {
        message.error("用户名不能为空");
      }
      let result = await _userEdit(values);
      switch (result.data.code) {
        case 0:
          message.error(result.data.msg);
          break;
        case 1:
          message.success(result.data.msg);
          break;
      }
    } catch (e) {}
  }
}

export default IdUserAdd;
