import React, { Component } from 'react'
import { Modal, Button, message } from 'antd';
import Axios from "@/utils/request";
import { inject, observer } from "mobx-react";

interface IProps {
    home?: any
}

interface IState {
    visible: boolean;
    val: string;
}

@inject('home') @observer
class Dialogs extends Component<IProps, IState> {
    state = { visible: false, val: "" };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    async handleOk() {
        console.log((new Date().getTime() + "").slice(5))
        const result = await Axios.get('/exam/insertQuestionsType', {
            params: {
                text: this.state.val,
                sort: (new Date().getTime() + "").slice(5)
            }
        })
        console.log(result.data)
        if (result.data.code === 1) {
            this.props.home.getClassifyList()
            message.success(result.data.msg);
        } else {
            message.error(result.data.msg);
        }
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e: any) => {
        this.setState({
            visible: false,
        });
    };
    change = (e: any) => {
        console.log(e.target.value)
        this.setState({
            val: e.target.value
        })
    }
    render() {
        return (
            <div className="hu-dialogs">
                <Button type="primary" onClick={this.showModal}>
                    +添加类型
                </Button>
                <Modal
                    title="创建新类型"
                    visible={this.state.visible}
                    onOk={() => this.handleOk()}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    centered={true}
                >
                    <p>
                        <input type="text" id="inp-dialogs" value={this.state.val} onChange={this.change} />
                    </p>
                </Modal>
            </div>
        )
    }
}
export default Dialogs