
import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'

interface Props {
    
}
interface State {

}

class ExamDetail extends Component<Props, State> {
    render() {
        return (
            <div>
                试卷详情
            </div>
        )
    }
}

export default ContentBox({
    title: '试卷详情',
    Module: ExamDetail
})