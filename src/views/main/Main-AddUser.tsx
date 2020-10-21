import { Tabs } from "antd";
import React, { Component } from "react";
import ContentBox from "@/components/ContentBox";
import UserAdd from "@/components/ControllerUser/User-Add";
import UpdateUser from "@/components/ControllerUser/User-Update";
import UserIdAdd from "@/components/ControllerUser/User-IdAdd";
import UserApiAdd from "@/components/ControllerUser/User-ApiAdd";
import UserAddView from "@/components/ControllerUser/User-AddView";
import UserApiSet from "@/components/ControllerUser/User-ApiSet";
import { _userAdd, _identity, _updateUser, _updateUsers } from "@/api/userAdd";

const { TabPane } = Tabs;
interface Props {}
interface State {}

class AddUser extends Component<Props, State> {
  callback: ((activeKey: string) => void) | undefined;
  render() {
    return (
      <div className="addUser_main">
        <div className="userAdd">
          <div className="addTabs">
            <Tabs onChange={this.callback} type="card">
              <TabPane tab="添加用户" key="1">
                <UserAdd></UserAdd>
              </TabPane>
              <TabPane tab="更新用户" key="2">
                <UpdateUser></UpdateUser>
              </TabPane>
            </Tabs>
          </div>
          <div className="addTabs">
            <Tabs onChange={this.callback} type="card">
              <TabPane tab="身份" key="1">
                <UserIdAdd></UserIdAdd>
              </TabPane>
            </Tabs>
          </div>
          <div className="addTabs">
            <Tabs onChange={this.callback} type="card">
              <TabPane tab="添加api权限" key="1">
              <UserApiAdd></UserApiAdd>
              </TabPane>
            </Tabs>
          </div>
          <div className="addTabs">
            <Tabs onChange={this.callback} type="card">
              <TabPane tab="添加视图接口权限" key="1">
                <UserAddView></UserAddView>
              </TabPane>
            </Tabs>
          </div>
          <div className="addTabs">
            <Tabs onChange={this.callback} type="card">
              <TabPane tab="给身份设置api接口权限" key="1">
                <UserApiSet></UserApiSet>
              </TabPane>
            </Tabs>
          </div>
          <div className="addTabs">
            <Tabs onChange={this.callback} type="card">
              <TabPane tab="给身份设置视图权限" key="1">
                <UserApiSet></UserApiSet>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentBox({
  title: "添加用户",
  Module: AddUser,
});
