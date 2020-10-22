// @ts-nocheck
import { Tabs } from "antd";
import React, { Component } from "react";
import AddUserConfig from '@/config/User-Add';
import ContentBox from "@/components/ContentBox";
import UserAdd from "@/components/ControllerUser/User-Add";
import UpdateUser from "@/components/ControllerUser/User-Update";

const { TabPane } = Tabs;
interface Props { }
interface State { }

class AddUser extends Component<Props, State> {

    reload() {
        this.forceUpdate();
    }

    callback: ((activeKey: string) => void) | undefined;
    render() {
        return (
            <div className="addUser_main">
                <div className="userAdd">
                    <div className="addTabs">
                        <Tabs onChange={this.callback} type="card">
                            <TabPane tab="添加用户" key="1">
                                <UserAdd reload={() => this.reload()}></UserAdd>
                            </TabPane>
                            <TabPane tab="更新用户" key="2">
                                <UpdateUser></UpdateUser>
                            </TabPane>
                        </Tabs>
                    </div>
                    {AddUserConfig.map((item, index) => {
                        return (
                            <div className="addTabs" key={index}>
                                <Tabs onChange={this.callback} type="card">
                                    <TabPane tab={item.tab} key='1'>
                                        {item.com}
                                    </TabPane>
                                </Tabs>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
export default ContentBox({
    title: "添加用户",
    Module: AddUser,
});
