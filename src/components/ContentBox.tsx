import React, { Component } from 'react'

interface Props {
    Module: any
    title: string
}

const ContentBox = (props:Props):any => {
    return class ContentBox extends Component {
        
        render() {
            console.log(this);
            return <div style={{width:"100%",height:"100%",padding: '20px',background:'#f0f2f5'}}>
                    <h2 style={{ padding: '10px 0' }}>{props.title}</h2>
                    <div style={{ width:"100%",height:"100%",background:'#fff',borderRadius:'10px'}}>
                        <props.Module {...this.props}/>
                    </div>
                </div>
        }
    }
}

export default ContentBox

//高阶组件，用于content的样式和标题展示