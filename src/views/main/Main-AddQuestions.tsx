import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'

interface Props {

}
interface State {

}

class AddQuestions extends Component<Props, State> {
    render() {
        return (
            <div>
                添加试题
            </div>
        )
    }
}

export default ContentBox({
    title: '添加试题',
    Module: AddQuestions
})
