

import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'

interface Props {
  
}
interface State {
  
}

class ExamPaperClassList extends Component<Props, State> {
    render() {
        return (
            <div>
                批卷班级
            </div>
        )
    }
}

export default ContentBox({
    title: '批卷班级',
    Module: ExamPaperClassList
})