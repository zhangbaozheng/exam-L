import React, { Component } from 'react'
<<<<<<< HEAD
import {NavLink} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import routes from '@/router/index';
import RouterView from '@/router/RouteView'
import { NotificationOutlined } from '@ant-design/icons';
=======
import { Layout, Menu } from 'antd';
import routes from '@/router/index'
import RouterView from '@/router/RouteView'
import {NavLink} from 'react-router-dom'
import { NotificationOutlined } from '@ant-design/icons';

>>>>>>> 290c56ec3b09146271dbb539823444cc5a937bd6
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface IRoute {
    path?: string
    component?: any
    redirect?: string
    isLogin?: boolean
    children?: IRoute[]
    name: string
}

interface Props {
    routes: IRoute[]
}
interface State {

}

export default class Home extends Component<Props, State> {
    state = {}

    render() {
        return (
            <Layout style={{ width: '100%', height: '100%' }}>
                <Header className="header" style={{ background: '#fff' }}>
<<<<<<< HEAD
                    <img className='wyy-logo' src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg" alt="" />
=======
                    <img className='wyy-logo' src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg" alt=""/>
>>>>>>> 290c56ec3b09146271dbb539823444cc5a937bd6
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            theme='dark'
<<<<<<< HEAD
                            style={{ height: '100%', borderRight: 0, }}
=======
                            style={{ height: '100%', borderRight: 0,  }}
>>>>>>> 290c56ec3b09146271dbb539823444cc5a937bd6
                        >
                            {
                                (routes[1].children as IRoute[]).map((item) => {
                                    return <SubMenu key={item.name} icon={<NotificationOutlined />} title={item.name}>
<<<<<<< HEAD
                                        {
                                            item.children && item.children.map((value) => {
                                                return <Menu.Item key={value.name} >{value.name}</Menu.Item>
                                            })
                                        } 
                                    </SubMenu>
=======
                                            {
                                                item.children && item.children.map((value) => {
                                                    return <Menu.Item key={value.name} >{value.name}</Menu.Item>
                                                })
                                            }
                                        </SubMenu>
>>>>>>> 290c56ec3b09146271dbb539823444cc5a937bd6
                                })
                            }
                        </Menu>
                    </Sider>
<<<<<<< HEAD
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <h2 style={{ marginTop: '10px', padding: "20px 0px" }}>
                            标题
                        </h2>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: '#fff',
                                borderRadius: "10px"
                            }}
                        >
                            <RouterView routes={this.props.routes}></RouterView>
                        </Content>
                    </Layout>
=======
                    <Content
                            className="site-layout-background"
                            style={{
                                margin: 0,
                                minHeight: 280,
                                background: '#fff',
                            }}
                        >
                            {/* <RouterView routes={this.props.routes}></RouterView> */}
                        </Content>
>>>>>>> 290c56ec3b09146271dbb539823444cc5a937bd6
                </Layout>
            </Layout>
        )
    }
}
