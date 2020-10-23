import React, { Component,createRef } from 'react';
import echarts from 'echarts';
interface IProps{
    option:any,
    eStyle:any
}
class Echarts extends Component<IProps> {
    constructor(props:any){
        super(props)
    }
    myRef=createRef<HTMLDivElement>(); //创建ref标签
    render() {
        return (
            <div ref={this.myRef} style={this.props.eStyle}>
            </div>
        );
    }
    componentDidMount(){
       let myChart = echarts.init((this.myRef.current as HTMLDivElement | HTMLCanvasElement));
       myChart.setOption(this.props.option);
    }
}

export default Echarts;