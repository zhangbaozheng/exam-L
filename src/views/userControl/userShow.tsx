import { Tabs, Table } from "antd";
import React, { Component } from "react";
import {
  _user,
  _identity,
  _relation,
  _authority,
  _view_authority,
  _user_new,
} from "@/api/index";
const { TabPane } = Tabs;
interface Props {}
interface State {}

export default class userAdd extends Component<Props, State> {
  state = {
    userAll: [
      {
        id: 1,
        name: "用户数据",
      },
      {
        id: 2,
        name: "身份数据",
      },
      {
        id: 3,
        name: "api接口权限",
      },
      {
        id: 4,
        name: "身份和api接口关系",
      },
      {
        id: 5,
        name: "视图接口权限",
      },
      {
        id: 6,
        name: "身份和视图权限关系",
      },
    ],
    data: [],
    columns: [],
    idData: [],
    userData: [],
    relationData: [],
    authorityData: [],
    view_authorityData: [],
    userId: localStorage.getItem("user_id"),
  };
  render() {
    return (
      <div style={{ padding: "20px" }}>
        <h2>用户展示</h2>
        <div className="ShowNav">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            {this.state.userAll.map((item, index) => {
              return (
                <TabPane tab={item.name} key={item.id}>
                  <div className="ant-wrapper">
                    <h2>{item.name}</h2>
                  </div>
                </TabPane>
              );
            })}
          </Tabs>
          <Table
            rowKey="key"
            columns={this.state.columns}
            dataSource={this.state.data}
          />
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.user();
  }
  //获取用户数据
  async user() {
    let result = await _user();
    let identity = await _identity();
    let relation = await _relation();
    let authority = await _authority();
    let user_new = await _user_new(this.state.userId);
    let view_authority = await _view_authority();
    this.setState(
      {
        userData: result.data.data,
        idData: identity.data.data,
        user_new: user_new.data.data,
        relationData: relation.data.data,
        authorityData: authority.data.data,
        view_authorityData: view_authority.data.data,
        
      },
      () => {
        this.callback("1");
      }
    );
  }
  //Tab点击事件
  callback = (key: any) => {
    let columns = [];
    switch (key) {
      case "1":
        columns = [
          {
            title: "用户名",
            dataIndex: "user_name",
            key: "name",
          },
          {
            title: "密码",
            dataIndex: "user_pwd",
            key: "age",
          },

          {
            title: "身份",
            key: "action",
            dataIndex: "identity_text",
          },
        ];
        this.setTabList(this.state.userData, columns);
        break;
      case "2":
        columns = [
          {
            title: "身份名称",
            dataIndex: "identity_text",
            key: "identity_text",
          },
        ];
        this.setTabList(this.state.idData, columns);
        break;
      case "3":
        columns = [
          {
            title: "api权限名称",
            dataIndex: "api_authority_text",
            key: "api_authority_text",
          },
          {
            title: "api权限url",
            dataIndex: "api_authority_url",
            key: "api_authority_url",
          },
          {
            title: "api权限方法",
            dataIndex: "api_authority_method",
            key: "api_authority_method",
          },
        ];
        this.setTabList(this.state.relationData, columns);
        break;
      case "4":
        columns = [
          {
            title: "身份名称",
            dataIndex: "identity_text",
            key: "identity_text",
          },
          {
            title: "api权限名称",
            dataIndex: "api_authority_text",
            key: "api_authority_text",
          },
          {
            title: "api权限url",
            dataIndex: "api_authority_url",
            key: "api_authority_url",
          },
          {
            title: "api权限方法",
            dataIndex: "api_authority_method",
            key: "api_authority_method",
          },
        ];
        this.setTabList(this.state.authorityData, columns);
        break;
      case "5":
        columns = [
          {
            title: "视图权限名称",
            dataIndex: "view_authority_text",
            key: "view_authority_text",
          },
          {
            title: "视图id",
            dataIndex: "view_id",
            key: "view_id",
          },
        ];
        this.setTabList(this.state.view_authorityData, columns);
        break;
      case "6":
        columns = [
          {
            title: "身份",
            dataIndex: "identity_text",
            key: "identity_text",
          },
          {
            title: "视图名称",
            dataIndex: "view_authority_text",
            key: "view_authority_text",
          },
          {
            title: "视图id",
            dataIndex: "view_id",
            key: "view_id",
          },
        ];
        this.setTabList(this.state.view_authorityData, columns);
        break;
    }
  };
  setTabList(data: any, columns: any) {
    this.setState({
      data: data.map((item: { key: number }) => {
        item.key = Math.random() * 100;
        return item;
      }),
      columns,
    });
  }
}
