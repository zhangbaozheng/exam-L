//@ts-nocheck
import echarts from "echarts";
import { Select } from "antd";
import _ from "lodash";
import React, { Component } from "react";
import { _getGradeList, _gradeStudent, _studentName } from "@/api/grade";
const { Option } = Select;
interface Props {}
interface State {}
class MainChart extends Component<Props, State> {
  state = {
    option: {
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'value'
    },
      xAxis: {
        type: "category",
        data: ["李潘红", "卢毓儒", "窦永铎", "侯瑞峰", "李仁鹏", "郭小刚", "王坤", "孟莹", "张馨心", "闫国程", "楚凤沛", "张志祥", "翟怡梦"],
    },
      tooltip: {
        trigger: 'axis'
    },
      series: [
        {
          data:  [96, 97, 88, 83, 89, 68, 44, 88, 35, 35, 100, 78, 93, 68, 86, 99, 77, 100, 100, 35, 35, 77, 66, 67, 99, 89],
          type: "line",
          name: '分数',
        },
      ],
    },
    gradeData: [],
  };

  render() {
    return (
      <div>
        <div
          id="main"
          style={{ width: "1200px", height: "500px" }}
          ref="mian"
        ></div>
        <span>请选择班级 : </span>
        <Select
          defaultValue="1610A"
          style={{ width: 120 }}
          onChange={(values) => {
            this.onDeselect(values);
          }}
        >
          {this.state.gradeData.map((item, index) => {
            return (
              <Option value={item.grade_id} key={index}>
                {item.grade_name}
              </Option>
            );
          })}
        </Select>
      </div>
    );
  }
  async componentDidMount() {
    let myChart = echarts.init(this.refs.mian);
    myChart.setOption(this.state.option);
    this.getGradeList();
    // this.onDeselect();
  }
  //获取班级信息
  async getGradeList() {
    let result = await _getGradeList();
    console.log(result.data.data);
    this.setState({
      gradeData: result.data.data,
    });
  }
  //根据班级来获取学生分数
  async onDeselect(values) {
    let myChart = echarts.init(this.refs.mian);
    let obj = {
      grade_id: values,
    };
    let result = await _gradeStudent(obj);
    let results = await _studentName(obj);
    let newdata = _.map(result.data.result, "score");
    let newdataname = _.map(results.data.exam, "student_name");
    this.state.option.series[0].data = newdata;
    myChart.setOption({
      series: {
        data: newdata,
      },
      xAxis: {
        data: newdataname,
      },
    });
  }
}
export default MainChart;
