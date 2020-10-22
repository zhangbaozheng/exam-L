
import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'
import { _TestDetail, _getQues } from '@/api/exam'
interface Props {
    history: any
    match: any
}
interface State {

}

class ExamDetail extends Component<Props, State> {
    state={
        data:[]
    }
    componentDidMount() {
        this.getData()
    }
    async getData() {
        let exam_exam_id = this.props.history.location.state.exam_exam_id
        const res = await _TestDetail(exam_exam_id);
        let data = res.data.exam
        let newdata: any[] = []
        data.forEach((item: any) => {
            if (item.exam_exam_id === exam_exam_id) {
                newdata.push(item)
            }
        })
        const res_q = await _getQues();
        const quesdata = res_q.data.data
        let ndata: any[] = []
        quesdata.forEach((item: any) => {
            newdata.forEach((val: any) => {
                if (item.subject_id === val.subject_id) {
                    ndata.push(item)
                }
            })
        })
        this.setState({
            data:ndata
        })
    }

    render() {
        return (
            <div className='s-detail'>
                {
                    this.state.data.map((item:any)=>{
                    return <p key={item.questions_id} className='s-item'>
                        <p>{item.title}</p>
                    <span>{item.questions_stem}</span>
                    </p>
                    })
                }
            </div>
        )
    }
}

export default ContentBox({
    title: '试卷详情',
    Module: ExamDetail
})