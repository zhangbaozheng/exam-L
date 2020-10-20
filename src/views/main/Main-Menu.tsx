import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'

interface Props {
  
}
interface State {
  
}

class Menu extends Component<Props, State> {
    render() {
        return (
            <div>
                添加菜单
            </div>
        )
    }
}

export default ContentBox({
    title: '添加菜单',
    Module: Menu
})