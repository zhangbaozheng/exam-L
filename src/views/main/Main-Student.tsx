import React, { Component } from 'react'
import ContentBox from '@/components/ContentBox'

interface Props {

}
interface State {

}

class Student extends Component<Props, State> {
    render() {
        return (
            <div>
                学生管理
            </div>
        )
    }
}

export default ContentBox({
    title: '学生管理',
    Module: Student
})
