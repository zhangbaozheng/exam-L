import React, { Component, createRef } from 'react';
import Echarts from '@/components/Echarts';
import echartsOption from '@/utils/echartsOption';
import { setCookie,getCookie,removeCookie } from '@/utils/index';
import { _login, _GetUserNew } from '@/api';
import { FormInstance } from 'antd/lib/form';
import { Form, Input, Button, Checkbox, message, Modal, notification } from 'antd';
import { RadiusUpleftOutlined, UserOutlined, LockOutlined, PhoneOutlined, DisconnectOutlined } from '@ant-design/icons';

interface ILogin {
    history: any
}
interface IState {
    visible: boolean
    codeMsg: any
    randomCode: any
    isClick:boolean
    rember:boolean
    eStyle:any
    myUser:any
    formRef:any
}
class Login extends Component<ILogin, IState> {
    constructor(props: ILogin) {
        super(props)
        this.state = {
            visible: false,
            codeMsg: '发送验证码',
            randomCode: null,  //验证码
            isClick:true, //是否禁用按钮
            rember:false,
            eStyle:{ //echarts的样式
                width: '100%',
                height: '100%',
            },
            myUser:createRef<HTMLDivElement>(), //创建ref标签
            formRef:React.createRef<FormInstance>()
        }
    }
    getUserName(){
        return getCookie('message')?JSON.parse((getCookie('message') as string)).user_name:''
    }
    getPwd(){
        return getCookie('message')?JSON.parse((getCookie('message') as any)).user_pwd:''
    }
    render() {
        return (
            <div className="login">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={(val) => { this.onFinish(val) }}
                >
                    <Form.Item
                        name="user_name"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input 
                        prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="请输入用户名" 
                        ref={(this.state.myUser as any)} 
                        defaultValue={this.getUserName()}

                        />
                    </Form.Item>
                    <Form.Item
                        name="user_pwd"
                        rules={[{ required: true, message: '请输入用户密码' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="请输入用户密码"
                            defaultValue={this.getPwd()}
                        />
                    </Form.Item>
                    <Form.Item >
                        <Form.Item noStyle>
                            <Checkbox className="zst-rem" onChange={()=>{this.remPwd()}}>记住密码</Checkbox>
                            <span className="login-form-forgot" onClick={() => { this.forgetPwd() }}>
                                忘记密码
                            </span>
                        </Form.Item>

                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                    </Button>
                    </Form.Item>
                </Form>
                {/* echarts背景 */}
                <Echarts option={echartsOption} eStyle={this.state.eStyle}></Echarts>
                {/* 找回密码框框 */}
                <Modal
                    title="找回密码"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    className="zst-alert"
                    closable={false}
                    footer={null}
                >
                  <Form
                            name="zst-findForm"
                            className="zst-find"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={(val:any) => { this.next(val) }}
                            ref={this.state.formRef}
                        >
                            
                            <h3>请填写您账号绑定的手机号</h3>
                            <Form.Item
                                name="tel"
                                rules={[{ required: true, message: '请输入您绑定的手机号' }]}
                            >
                                <Input
                                    prefix={<PhoneOutlined />}
                                    type="telephone"
                                    onBlur={(e) => { this.myBur(e) }}
                                />
                            </Form.Item>
                            <h3>请填写验证码</h3>
                            <Form.Item
                                name="freeCode"
                                rules={[{ required: true, message: '请输入验证码' }]}
                            >
                                <Input
                                    prefix={<DisconnectOutlined />}
                                    type="text"
                                />
                            </Form.Item>
                            <button disabled={this.state.isClick} onClick={()=>this.sendCode()} > {this.state.codeMsg}</button>
                            <RadiusUpleftOutlined style={{ display: 'none' }} />
                            <Form.Item >
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    下一步
                                </Button>
                            </Form.Item>
                        </Form>          
                </Modal>
            </div>
        )
    }
    remPwd(){ //记住密码
        this.setState({
            rember:!this.state.rember
        },()=>{
            console.log(this.state.rember)
        })
        
    }
     //登录事件
     async onFinish(values: any) {
         if(this.state.rember){ //如果是记住密码
            setCookie('message',JSON.stringify(values))
           
         }else{
            removeCookie('message')
           
         }
        const result = await _login(values)
        if (result.data.code === 1) {
            // 保存token
            setCookie('token', result.data.token)
            this.getPermission(result.data.userInfo)
        } else {
            message.error('用户名或密码错误')
        }
    };
    // 获取权限
    async getPermission(userInfo: any) {
        setCookie('userInfo', JSON.stringify(userInfo))
        const result = await _GetUserNew(userInfo.user_id)
        if (result.data.code === 1) {
            // 保存权限数组
            setCookie('permission', JSON.stringify(result.data.data))
            // 登录成功跳转到首页
            message.success('登录成功', 1, () => {
                this.props.history.push('/index')
            })
        }
    }
    openNotification = (placement: any) => { //验证码提示框配置
        notification.info({
            message: `验证码如下`,
            description:
                this.state.randomCode,
            placement,
        });
    }
    myBur(e: any) { //手机号失去焦点时校验

        let telReg = /^1[3456789]\d{9}$/ //手机号正则

        if (telReg.test(e.target.value)) { //如果正则匹配通过
            this.setState({
                isClick:false
            })
        } else {
            message.error('请输入正确的手机号')
            this.setState({
                isClick:true
            })
        }

    }
    forgetPwd() { //忘记密码
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => { //关闭时触发
        this.setState({
            visible: false,
        });
        (this.state.formRef.current as FormInstance<any>).resetFields(); //重置
    }
    next(val: any) { //找回验证码下一步
        if(val.freeCode === this.state.randomCode){ //如果验证码通过
            message.success('修改成功', 1, () => {
                window.open('http://www.baidu.com')
            })
            this.setState({
                visible:false
            })
        }else{
            message.error('验证码验证失败')
        }
    }
    createCode() { //生成验证码
        let code = "";
        for (let i = 0; i < 6; i++) {
            let radom = Math.floor(Math.random() * 10);
            code += radom;
        }
        return code
    }
    sendCode() { //发送验证码

        this.setState({
            randomCode: this.createCode()
        }, () => {
            this.openNotification('topLeft') //弹出提示框
        })

        this.setState({
            isClick:true
        })

        let time = 10; //倒计时的时间总长
        let timer = setInterval(() => {
            time--
            if (time <= 0) {
                this.setState({
                    codeMsg: '发送验证码',
                    isClick:false
                })
                clearInterval(timer)
            } else {

                this.setState({
                    codeMsg: time + '秒后可重新发送'
                })
            }
        }, 1000)

    }

}
export default Login
