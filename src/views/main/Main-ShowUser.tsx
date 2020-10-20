import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'
interface Props {
    
}
interface State {
    
}
class ShowUser extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <div>
                用户展示
            </div>
        )
    }
}

export default ContentBox({
    title: "用户展示",
    Module: ShowUser
})
