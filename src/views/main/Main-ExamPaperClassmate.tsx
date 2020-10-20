

import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'

interface Props {
  
}
interface State {
  
}

class ExamPaperClassmate extends Component<Props, State> {
    render() {
        return (
            <div>
                待批试卷
            </div>
        )
    }
}

export default ContentBox({
    title: '待批试卷',
    Module: ExamPaperClassmate
})