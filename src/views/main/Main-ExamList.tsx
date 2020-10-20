import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'

interface Props {

}
interface State {

}
class ExamList extends Component<Props, State> {
    render() {
        return (
            <div className='s-list'>
                试卷列表
            </div>
        )
    }
}

export default ContentBox({
    title: '试卷列表',
    Module: ExamList
})
