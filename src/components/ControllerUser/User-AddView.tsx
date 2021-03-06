import React, { Component } from "react";
import { FormInstance } from "antd/lib/form";
import { Form, Button, Select, message } from "antd";
import { _userAddView, _userView } from "@/api/userAdd";

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
    viewData: [],
    userInfo: "",
  };

  //提交事件
  onFinish = (values: object) => {
    this.userAddView(values);
    (this.props as any).reload();
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
          <Form.Item name="view_id">
            <Select placeholder="添加视图接口权限" allowClear>
              {this.state.viewData.map((item: any, index: number) => {
                return (
                  <Option value={item.view_id} key={index}>
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
    this.userView();
  }
  async userView() {
    let result = await _userView();
    this.setState({
      viewData: result.data.data,
    });
  }
  async userAddView(values: any) {
    try {
      if (values.view_id === undefined) {
        return message.error("内容不能为空");
      }
      let info = this.state.viewData.filter(
        (item: any) => item.view_id === values.view_id
      );
      let obj = {
        arr: info,
        view_id: values.view_id,
      };
      let result = await _userAddView(obj);
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
    } catch (error) {}
  }
}

export default UpdateUser;
