import React, { Component } from 'react'
import { Button, Table, Space,message } from "antd"
import { inject, observer } from "mobx-react"
import Dialogs from "@/components/Dialogs";
import Axios from "@/utils/request";
const { Column } = Table;

interface IProps {
    home: any
}
interface IState {
    flag: boolean;
    id: string;
}

@inject('home') @observer
class Classify extends Component<IProps, IState> {
    state = {
        flag: false,
        id: ''
    }
    async changeId(val:any) {
        console.log(val.questions_type_id)
        const result = await Axios.post('/exam/delQuestionsType',{
            id:val.questions_type_id
        })
        if (result.data.code === 1) {
            this.props.home.getClassifyList()
            message.success(result.data.msg);
        } else {
            message.error(result.data.msg);
        }
    }
    render() {
        const { classifyList } = this.props.home
        return (
            <div className="hu-classify">
                <div className="hu-add">
                    <Dialogs />
                </div>
                <div className="hu-main">
                    <Table dataSource={classifyList}>
                        <Column title="类型ID" dataIndex="questions_type_id" />
                        <Column title="类型名称" dataIndex="questions_type_text" />
                        <Column
                            title="操作"
                            render={(text, record) => (
                                <Space size="middle">
                                    <Button type="primary" danger onClick={() => this.changeId(record)}>删除</Button>
                                </Space>
                            )}
                        />
                    </Table>
                </div>
            </div>
        )
    }
}
export default Classify;