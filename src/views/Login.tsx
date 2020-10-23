import React, { Component } from 'react';
import Echarts from '@/components/Echarts';
import echartsOption from '@/utils/echartsOption';

import {setCookie} from '@/utils/index';
import { _login, _GetUserNew} from '@/api';
import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface ILogin{
    history:any

}
class Login extends Component<ILogin> {
    eStyle={
        width:'100%',
        height:'100%',
        position:'absolute',
        left:0,
        top:0
    }
    //登录事件
    async onFinish(values: any){
        const result = await _login(values)
        if(result.data.code === 1){
            // 保存token
            setCookie('token',result.data.token)
            this.getPermission(result.data.userInfo)
        }else{
            message.error('用户名或密码错误')
        }
    };
    // 获取权限
    async getPermission(userInfo:any) {
        setCookie('userInfo',JSON.stringify(userInfo))
        const result = await _GetUserNew(userInfo.user_id)
        if(result.data.code === 1){
            // 保存权限数组
            setCookie('permission',JSON.stringify(result.data.data))
            // 登录成功跳转到首页
            message.success('登录成功',1,()=>{
                this.props.history.push('/index')
            })
        }
    }

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

                        <a className="login-form-forgot" href="https://www.baidu.com/">
                            忘记密码
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                    </Button>

                    </Form.Item>
                </Form>
                <Echarts option={echartsOption} eStyle={this.eStyle}></Echarts>
            </div>


        )
    }
}
export default Login
