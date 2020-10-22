import React, { Component } from "react";
import { Layout, Menu } from "antd";
import RouterView from "@/router/RouteView";
import { NotificationOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { inject,observer } from "mobx-react"
const { Header, Content, Sider } = Layout;

interface IRoute {
  path?: string;
  component?: any;
  redirect?: string;
  isLogin?: boolean;
  children?: IRoute[];
  name: string;
  flag:boolean;
}

interface Props {
  routes: IRoute[];
  home:any
}
interface State {
    title:string;
}

@inject('home') @observer
 class Home extends Component<Props, State> {
  state = {
      title:''
  }
   
  componentDidMount(){
   this.props.home.getClassifyList()
  }

  getStateTitle = (val:string)=>{
    this.props.home.setTitle(val)
  }

  render() {
     const {titles} = this.props.home
    return (
      <Layout style={{ width: "100%", height: "100%" }}>
        <Header className="header" style={{ background: "#fff" }}>
          <img
            className="wyy-logo"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg"
            alt=""
          />
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              theme="dark"
              style={{ height: "100%", borderRight: 0 }}
            >
              {(this.props.routes as IRoute[]).map((item) => {
                if(item.flag){
                  return (
                  <Menu.Item
                    key={item.name}
                    icon={<NotificationOutlined />}
                    title={item.name}
                    onClick={()=>this.getStateTitle(item.name)}
                  >
                      <NavLink to={item.path as string}>{item.name}</NavLink>
                  </Menu.Item>
                );
                }
                
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <h2 style={{ marginTop: "10px", padding: "20px 0px" }}>{titles}</h2>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: "#fff",
                borderRadius: "10px",
              }}
            >
              <RouterView routes={this.props.routes}></RouterView>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Home