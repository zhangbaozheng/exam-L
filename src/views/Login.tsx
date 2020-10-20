import React, { Component } from "react";
import { Form, Input, Button, Checkbox,message, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Axios from "@/utils/request";
import { RouteComponentProps } from "react-router-dom";
interface IProps {}
interface IState {}
class Login extends Component<IProps & RouteComponentProps, IState> {
  async onFinish(values: any) {
    const result = await Axios.post("/user/login", {
      user_name: values.username,
      user_pwd: values.password,
    });
    console.log(result.data);
    if (result.data.code === 1) {
      this.props.history.push("/index");
      message.success(result.data.msg);
    } else {
        message.error(result.data.msg);
    }
  }

  render() {
    return (
      <div className="hu-login">
        <div className="login-box">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={(values) => this.onFinish(values)}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                忘记密码
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default Login;
