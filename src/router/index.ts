<<<<<<< HEAD
/*
 * @Author: your name
 * @Date: 2020-10-19 18:59:55
 * @LastEditTime: 2020-10-20 13:06:52
 * @LastEditors: 王寒烟
 * @Description: In User Settings Edit
 * @FilePath: \exam-L\src\router\index.ts
 */
import Home from "@/views/Home";
import Login from "@/views/Login";
import UserContol from '@/views/userContol'
import UserAdd from "@/views/userControl/userAdd"
import UserShow from "@/views/userControl/userShow"
import Grade from '@/views/grade/Grade'
import List from '@/views/grade/List'
import Room from '@/views/grade/Room'
import Student from '@/views/grade/Student'
import Addtest from '@/views/home-children/Addtest';
import Classify from '@/views/home-children/Classify';
import Examine from '@/views/home-children/Examine';
const routes = [
=======

import Home from "@/views/Home"
import Login from "@/views/Login"
import Menu from '@/views/main/Main-Menu'
import Room from '@/views/main/Main-Room'
import Grade from '@/views/main/Main-Grade'
import Student from '@/views/main/Main-Student'
import AddUser from "@/views/main/Main-AddUser"
import AddExam from "@/views/main/Main-AddExam"
import ShowUser from "@/views/main/Main-ShowUser"
import ExamList from "@/views/main/Main-ExamList"
import ExamEdit from "@/views/main/Main-ExamEdit"
import ExamDetail from '@/views/main/Main-ExamDetail'
import AddQuestions from '@/views/main/Main-AddQuestions'
import EditQuestions from '@/views/main/Main-EditQuestions'
import QuestionsType from '@/views/main/Main-QuestionsType';
import WatchQuestions from '@/views/main/Main-WatchQuestions';
import QuestionsDetail from '@/views/main/Main-QuestionsDetail';
import ExaminationPapers from "@/views/main/Main-ExaminationPapers"
import ExamPaperClassList from "@/views/main/Main-ExamPaperClassList"
import ExamPaperClassmate from "@/views/main/Main-ExamPaperClassmate"


export const components = {
    Menu,
    Room,
    Grade,
    Student,
    AddUser,
    AddExam,
    ShowUser,
    ExamList,
    ExamEdit,
    ExamDetail,
    AddQuestions,
    EditQuestions,
    QuestionsType,
    WatchQuestions,
    QuestionsDetail,
    ExaminationPapers,
    ExamPaperClassList,
    ExamPaperClassmate
}




export const routes = [
>>>>>>> bd1f485422caf6f3184879cbe5b18ce136a3cd81
    {
        path: "/",
        redirect: "/index",
        name: "/",
    },
    {
        path: "/index",
        name: "index",
        component: Home,
        children: [
            {
                path: '/index/useradd',
                name: "添加用户",
                component: AddUser
            },
            {
                path: '/index/showUser',
                name: "用户展示",
                component: ShowUser
            },
            {
                path: '/index/Grade',
                name: '班级管理',
                component: Grade,
<<<<<<< HEAD
                children: [
                    {
                        path: '/index/grade/list',
                        name: '班级管理',
                        component: List,
                    },
                    {
                        path: '/index/grade/room',
                        name: '教室管理',
                        component: Room,
                    },
                    {
                        path: '/index/grade/student',
                        name: '学生管理',
                        component: Student,
                    }
                ]
=======
>>>>>>> bd1f485422caf6f3184879cbe5b18ce136a3cd81
            },
            {
                path: '/index/room',
                name: '教室管理',
                component: Room,
            },
            {
                path: '/index/student',
                name: '学生管理',
                component: Student,
            },
            {
                path: '/index/addQuestions',
                name: '添加试题',
                component: AddQuestions
            },
            {
                path: '/index/questionsType',
                name: '试题分类',
                component: QuestionsType
            },
            {
                path: '/index/watchQuestions',
                name: '查看试题',
                component: WatchQuestions
            },
            {
                path: "/index/addExam",
                name: "添加考试",
                component: AddExam,
            },
            {
                path: "/index/examList",
                name: "试卷列表",
                component: ExamList,
            }
        ],
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
];





