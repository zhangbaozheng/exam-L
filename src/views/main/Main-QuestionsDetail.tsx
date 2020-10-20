import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'

interface Props {
  
}
interface State {
  
}

class QuestionsDetail extends Component<Props, State> {
    render() {
        return (
            <div>
                试题详情
            </div>
        )
    }
}

export default ContentBox({
    title: '试题详情',
    Module: QuestionsDetail
})