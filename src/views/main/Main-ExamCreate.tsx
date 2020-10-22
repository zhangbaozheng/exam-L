import React, { Component } from 'react'
import { Button, Drawer, Tag, Form, Select, Modal } from 'antd'
import { NavLink } from 'react-router-dom'
import { _addTest, _getTestSubject, _getTestType, _getQuesType, _getQues } from '@/api/exam'
const { CheckableTag } = Tag;
const { Option } = Select;
interface Props {
    history: any

}
interface State {

}
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
class ExamCreate extends Component<Props, State> {
    state = {
        tit: '',
        time: '',
        show: false,
        sub: [],
        selectedTags: ['Books'],
        type: [],
        questype: [],
        ques: [],
        subdata: [],
        quesdata: [],
        typedata: [],
        fields: [],
        visible: false
    }

    componentDidMount() {
        let values = this.props.history.location.state.values
        let { title, start_time } = values
        this.getDate(title, start_time)
        this.getTestSubject()
        this.getTestType()
        this.getQuesType()
        this.getQues()
        // this.getItemType()
    }
    //抽屉显示隐藏
    showDrawer = () => {
        this.setState({
            show: true
        })
    };
    onClose = () => {
        this.setState({
            show: false
        })
    };
    //获取数据
    getDate = (title: string, start_time: string) => {
        if (title) {
            this.setState({
                tit: title,
                time: String(start_time),
            }, () => {
                console.log(this.state.tit);
            })
        }

    }
    onFinish = async (values: any) => {
        let arr: any[] = []
        let newques: any[] = []
        arr.push(values)


        this.state.ques.forEach((val: any) => {
            arr.forEach((item: any) => {
                this.state.questype.forEach((val2: any) => {
                    // this.state.subdata.forEach((val3:any)=>{
                    if (item.exam_id == val.exam_id && item.questions_type_id == val2.questions_type_id) {
                        newques.push(val)
                        this.setState({
                            ques: newques
                        })
                    }
                    // })

                })
            })
        })
    };
    handleChange(tag: string, checked: any) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        console
            .log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
        let arr = []
        arr.push(tag)
        this.setState({
            subdata: arr
        })

    }
    //课程
    async getTestSubject() {
        const res = await _getTestSubject();
        if (res.data.code) {
            this.setState({
                sub: res.data.data
            })
        }
    }
    //考试类型
    async getTestType() {
        const res = await _getTestType();
        if (res.data.code) {
            this.setState({
                type: res.data.data
            })
        }
    }
    //问题类型
    async getQuesType() {
        const res = await _getQuesType();
        if (res.data.code) {
            this.setState({
                questype: res.data.data
            })
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk =  (e:any)  => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e:any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    //获取所有问题列表
    async getQues() {
        const res = await _getQues();
        if (res.data.code) {
            this.setState({
                ques: res.data.data
            })
        }

    }
    render() {
        const { selectedTags, sub, type, ques, questype } = this.state;
        return (
            <div className='s-create'>
                <Drawer
                    title="所有题目"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.show}
                    width={800}
                >
                    <Form
                        initialValues={this.state.fields}
                        name="basic"
                        onFinish={this.onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item>
                            <div className='s-sub'>
                                <span style={{ marginRight: 8 }}>课程类型：</span>
                                {sub.map((item: any) => (
                                    <CheckableTag
                                        key={item.subject_id}
                                        checked={selectedTags.indexOf(item) > -1}
                                        onChange={checked => this.handleChange(item, checked)}
                                    >
                                        {item.subject_text}
                                    </CheckableTag>
                                ))}
                            </div>
                        </Form.Item>
                        <div className="s-detail-search">
                            <Form.Item
                                label="考试类型"
                                name='exam_id'
                                rules={[{ required: true, message: '请输入课程!' }]}
                                style={{ marginBottom: '70px' }}
                            >
                                <Select style={{ width: '120px' }}>
                                    {
                                        type.map((item: any) => {
                                            return <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="考试类型"
                                name='questions_type_id'
                                rules={[{ required: true, message: '请输入课程!' }]}
                                style={{ marginBottom: '70px' }}
                            >
                                <Select style={{ width: '120px' }}>
                                    {
                                        questype.map((item: any) => {
                                            return <Option value={item.questions_type_id} key={item.questions_type_id}>{item.questions_type_text}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" >
                                    查询
                        </Button>
                            </Form.Item>
                        </div>
                    </Form>
                    <div className="s-list">
                        {
                            ques.map((item: any) => {
                                return (
                                    <div key={item.questions_id} className='s-list-item'>
                                        {item.title}
                                        
                                        <div className="s-item-type">
                                        
                                            <span>
                                                <Tag color="blue" className='Tag'>{item.subject_text}</Tag>
                                                <Tag color="purple" className='Tag'>{item.exam_name}</Tag>
                                                <Tag color="orange" className='Tag'>{item.questions_type_text}</Tag>
                                            </span>
                                            <span><p>添加</p><p onClick={this.showModal}>详情</p></span>
                                          
                                        </div>
                                    
                                    </div>

                                )
                            })
                        }

                    </div>
                </Drawer>
                <p>创建试卷</p>

                <div className="create-box">
                    <Button id='btn_one' onClick={this.showDrawer}> + 添加试题</Button>
                    <h2>{this.state.tit}</h2>
                    <p>考试时间：1小时30分钟 监考人：刘于 开始考试时间：{this.state.time} 阅卷人：刘于</p>
                    <Button type="primary" id='btn_two'><NavLink to='/index/examList'> + 创建试卷</NavLink></Button>
                </div>
                <Modal
                                            title="Basic Modal"
                                            visible={this.state.visible}
                                            onOk={this.handleOk}
                                            onCancel={this.handleCancel}
                                        >
                                         
                                        </Modal>
            </div>
        )
    }
}

export default ExamCreate
