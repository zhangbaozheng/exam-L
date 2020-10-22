

import NavList from '@/router/navList'
import Loading from '@/components/Loading'
import { NavLink } from 'react-router-dom';
import RouterView from '@/router/RouteView'
import { components } from '@/router/index'
import { getCookie,removeCookie } from '@/utils'
import React, { Component,Suspense } from 'react'
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface IRoute {
    path?: any;
    component?: any;
    redirect?: string;
    isLogin?: boolean;
    children?: IRoute[];
    name: string;
}

interface Cpn {
    [key:string]: any
}

interface Props {
    routes: IRoute[];
    history:any
}

interface State {
    routes: IRoute[] | null
    navArr: IRoute[] | null
    visible: boolean;
}

export default class Home extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            routes: null,
            navArr: null,
            visible: false,
        }
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="1">个人中心</Menu.Item>
                <Menu.Item key="2">我的班级</Menu.Item>
                <Menu.Item key="3">设置</Menu.Item>
                <Menu.Item key="4" onClick={()=>{this.logoff()}}>退出登录</Menu.Item>
            </Menu>
        )
        return (
            <Layout style={{ width: '100%', height: '100%' }}>
                <Header className="header">
                    <img className='wyy-logo' src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg" alt="" />
                        <Dropdown
                            overlay={menu}
                            onVisibleChange={this.handleVisibleChange}
                            visible={this.state.visible}
                            >
                            <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <Avatar size={40} icon={<UserOutlined />} /> 
                                {this.getUserName()} <DownOutlined />
                            </span>
                        </Dropdown>

                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            theme='dark'
                            style={{ height: '100%', borderRight: 0, }}
                        >
                            {
                                (this.state.navArr || NavList).map((item) => {
                                    return <SubMenu key={item.name} icon={<NotificationOutlined />} title={item.name}>
                                        {
                                            item.children && item.children.map((value) => {
                                                return <Menu.Item key={value.name}> <NavLink to={value.path}>{value.name}</NavLink></Menu.Item>
                                            })
                                        }
                                    </SubMenu>
                                })
                            }
                        </Menu>
                    </Sider>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: 0,
                            minHeight: 280,
                            background: '#fff',
                        }}
                    >   
                        <Suspense fallback={<Loading />}>
                            <RouterView routes={this.state.routes || this.props.routes}></RouterView>
                        </Suspense>
                    </Content>
                </Layout>
            </Layout>
        )
    }
    componentDidMount() {
        let arr = JSON.parse((getCookie('permission') as string));
        this.disposalData(arr)
    }
    // 生成动态路由
    disposalData(arr: any[]) {
        let children:IRoute[] = [];
        let navArr:string[] = []
        arr.forEach((item:any) => {
            if(item.view_id !== 'login' && item.view_id !== 'main') {
                let path = item.view_id.split('-')[1]
                let component = path[0].toUpperCase() + path.slice(1)
                children.push({
                    path: '/index/' + path,
                    name: item.view_authority_text,
                    component: (components as Cpn)[component]
                })
                navArr.push('/index/' + path)
            }
        })
        this.setState({
            routes: children
        })
        this.disposalNav(navArr)
    }
    // 生成动态nav
    disposalNav(arr: string[]) {
        let navArr:IRoute[] = [];
        let navItem:any[] = [];
        NavList.forEach((item) => {
            navItem = (item.children as IRoute[]).filter((val) => {
                return arr.indexOf(val.path) > -1
            })
            if((navItem as any[]).length) {
                navArr.push({
                    name: item.name,
                    children: navItem
                })
            }
        })
        this.setState({
            navArr
        })
    }
    getUserName() { //拿用户名字
        return JSON.parse((getCookie('userInfo') as string)).user_name
    }
    handleVisibleChange = (flag: any) => {
        this.setState({ visible: flag });
    }
    logoff(){ //退出登录
        // removeCookie('token');
        removeCookie('userInfo');
        removeCookie('permission');
        this.props.history.push('/login');
    }
}
