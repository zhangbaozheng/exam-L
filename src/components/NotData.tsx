import React, { Component } from 'react'
import { Result } from 'antd';
export default class NotData extends Component {
    render() {
        return (
            <div>
                <Result
                    status="404"
                    subTitle="暂无数据"
                />
            </div>
        )
    }
}
