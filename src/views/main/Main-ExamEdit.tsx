import React, { Component } from 'react'
import { Button, Drawer, Tag, Form, Select, Modal, message, Popconfirm } from 'antd'
import { NavLink } from 'react-router-dom'
import ContentBox from '@/components/ContentBox'
import { _addTest, _getTestSubject, _getTestType, _getQuesType, _getQues, _getQuesCon } from '@/api/exam'
const { Option } = Select;
interface Props {
    history: any

}
interface State {

}
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
class ExamEdit extends Component<Props, State> {
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
        fields: {
            subject_id: '',
            exam_id: '',
            questions_type_id: '',
        },
        visible: false,
        current: -1,
        subid: '',
        detailitem: [],
        itemdata: []
    }
    componentDidMount() {
        let values = this.props.history.location.state.values
        let { title, start_time } = values
        this.getDate(title, start_time)
        this.getTestSubject()
        this.getTestType()
        this.getQuesType()
        this.getQues()
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

            })
        }

    }
    //查询
    onFinish = async (values: any) => {
        values = Object.assign(this.state.fields, values, {
            subject_id: this.state.subid,
        })
        const res = await _getQuesCon(values.subject_id, values.exam_id, values.questions_type_id);
        if (res.data.code) {
            message.info('查询成功');
            this.setState({
                ques: res.data.data
            })
        } else {
            message.info('查询失败');
        }
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
    showModal = (item: any) => {
        this.setState({
            visible: true,
        });

        let res = this.state.ques.filter((val: any) => {
            return val.title === item.title
        });
        this.setState({
            detailitem: res
        })
        console.log(res);
    };

    handleOk = (e: any) => {
        console.log(e);

        this.setState({
            visible: false,
        });
    };

    handleCancel = (e: any) => {
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
    change_span(index: number, id: string) {
        this.setState({
            current: index,
            subid: id
        })
    }

    all() {
        this.getQues()
        this.setState({
            current: -1
        })
    }
    addTest(item: any) {
        const index = this.state.itemdata.findIndex(val => item === val)
        let arr = [...this.state.itemdata, item]

        if (index === -1) {
            arr.forEach(val => {
                if (item === val) {
                    this.setState({
                        itemdata: arr
                    })
                }
            })
            message.info('添加成功')
        } else {
            message.info('不能重复添加')
        }

    }

    Remove(index: number) {
        let arr = [...this.state.itemdata].splice(index + 1, 1)
        this.setState({
            itemdata: arr
        })
        message.info('删除成功')
    }
    cancel(e:any) {
        message.error('取消删除');
      }
    render() {
        const { sub, type, ques, questype } = this.state;
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
                        <Form.Item
                            name='subject_id'
                        >
                            <div className='s-sub'>
                                <span style={{ marginRight: 8 }}>课程类型：</span>
                                <span onClick={() => this.all()} className={this.state.current == -1 ? 'active' : ''}>All</span>
                                {sub.map((item: any, index: number) => (
                                    <span key={item.subject_id}
                                        onClick={() => this.change_span(index, item.subject_id)}
                                        className={index == this.state.current ? 'active' : ''}
                                    >
                                        {item.subject_text}
                                    </span>
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
                                            <span><p onClick={() => this.addTest(item)}>添加</p><p onClick={() => this.showModal(item)}>详情</p></span>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Drawer>
                <div className="create-box">
                    <Button id='btn_one' onClick={this.showDrawer}> + 添加试题</Button>
                    <h2>{this.state.tit}</h2>
                    <p>考试时间：1小时30分钟    监考人：刘于    开始考试时间：{this.state.time}    阅卷人：刘于</p>
                    {
                        this.state.itemdata.map((item: any, index: number) => {
                            return <div key={index} className='s-create-item'>
                                {/* <span onClick={() => this.Remove(index)}>删除</span> */}
                                <Popconfirm
                                    title="您确定要删除吗?"
                                    onConfirm={() => this.Remove(index)}
                                    onCancel={this.cancel}
                                    okText="是的"
                                    cancelText="取消"
                                >
                                    <span>删除</span>
                                </Popconfirm>,
                                <b>  {item.title}</b>
                                <p className='s-answer'> {item.questions_stem}</p>
                            </div>
                        })
                    }
                    <Button type="primary" id='btn_two'><NavLink to='/index/examList'> + 创建试卷</NavLink></Button>
                </div>

                <Modal
                    title='详情'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    {
                        this.state.detailitem.map((item: any, index: number) => {
                            return <div key={index}>
                                <b>{item.title}</b>
                                <div className='s-answer'>{item.questions_answer}</div>
                            </div>
                        })
                    }
                </Modal>


            </div>
        )
    }
}

export default ContentBox({
    title: '创建试卷',
    Module: ExamEdit
})

