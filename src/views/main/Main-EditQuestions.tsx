import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'

interface Props {
  
}
interface State {
  
}

class EditQuestions extends Component<Props, State> {
    render() {
        return (
            <div>
                编辑试题
            </div>
        )
    }
}

export default ContentBox({
    title: '编辑试题',
    Module: EditQuestions
})

