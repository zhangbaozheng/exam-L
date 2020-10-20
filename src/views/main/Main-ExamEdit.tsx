import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'

interface Props {

}
interface State {

}

class ExamEdit extends Component<Props, State> {
    render() {
        return (
            <div>
                创建试卷
            </div>
        )
    }
}

export default ContentBox({
    title: '创建试卷',
    Module: ExamEdit
})

