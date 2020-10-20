import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'

interface Props {
  
}
interface State {
  
}

class WatchQuestions extends Component<Props, State> {
    render() {
        return (
            <div>
                查看试题
            </div>
        )
    }
}

export default ContentBox({
    title: '查看试题',
    Module: WatchQuestions
})