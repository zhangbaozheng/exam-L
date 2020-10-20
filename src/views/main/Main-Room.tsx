import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'

interface Props {

}
interface State {

}


class Room extends Component<Props, State> {
    render() {
        return (
            <div>
                教室管理
            </div>
        )
    }
}

export default ContentBox({
    title: '教室管理',
    Module: Room
})
