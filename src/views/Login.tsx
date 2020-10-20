import React, { Component } from 'react'
import { _login } from '@/api'
import {setCookie} from '@/utils/index'
import { Form, Input, Button, Checkbox,message, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
interface ILogin{
    history:any
}
class Login extends Component<ILogin> {

    async onFinish(values: any){

        const result = await _login(values)
        if(result.data.code === 1){
            setCookie('token',result.data.token)
            message.success('登录成功',1,()=>{
                this.props.history.push('/index')
            })  
        }else{
            message.error('用户名或密码错误')
        }
    };

    render() {
        return (
            <div className="login">

                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={(val)=>{this.onFinish(val)}}
                >
                    <Form.Item
                        name="user_name"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item
                        name="user_pwd"
                        rules={[{ required: true, message: '请输入用户密码' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="请输入用户密码"
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
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                    </Button>

                    </Form.Item>
                </Form>
            </div>


        )
    }
}
export default Login
