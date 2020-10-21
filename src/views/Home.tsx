
import { Layout, Menu } from 'antd';
import NavList from '@/router/navList'
import { getCookie } from '@/utils/index'
import { NavLink } from 'react-router-dom';
import RouterView from '@/router/RouteView'
import { NotificationOutlined } from '@ant-design/icons';
import React, { Component } from 'react';

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

interface Props {
  routes: IRoute[];
}

interface State {
    routes: IRoute[]
}

export default class Home extends Component<Props, State> {
    state: { routes: never[]; };
    props: any;
    constructor(props:Props) {
        super(props)
        this.state = {
            routes: []
        }
    }
    render() {
        return (
            <Layout style={{ width: '100%', height: '100%' }}>
                <Header className="header" style={{ background: '#fff' }}>
                    <img className='wyy-logo' src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg" alt="" />
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
                                NavList.map((item) => {
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
                        <RouterView routes={this.props.routes}></RouterView>
                    </Content>
                </Layout>
            </Layout>
        )
    }
    componentDidMount() {
        this.disposalData()
    }
    disposalData() {
        let arr = JSON.parse((getCookie('permission') as string));
        //item.view_id  item.view_authority_text
        let children:any[] = [];
        arr.forEach((item:any) => {
            if(item.view_id !== 'login' && item.view_id !== 'main') {
                let path = item.view_id.split('-')[1]
                let component = path[0].toUpperCase() + path.slice(1)
                children.push({
                    path: '/index/' + path,
                    name: item.view_authority_text,
                    component
                })
            }
        })
        this.setState({
            routes: children
        })
        console.log(children);
    }
}
