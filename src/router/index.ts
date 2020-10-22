
import { lazy } from 'react'
const Home = lazy(()=> import("@/views/Home"))
const Login = lazy(()=> import("@/views/Login"))
const Error = lazy(()=> import("@/views/404"))
const Menu = lazy(()=> import("@/views/main/Main-Menu"))
const Room = lazy(()=> import("@/views/main/Main-Room"))
const Grade = lazy(()=> import("@/views/main/Main-Grade"))
const Student = lazy(()=> import("@/views/main/Main-Student"))
const AddUser = lazy(()=> import("@/views/main/Main-AddUser"))
const AddExam = lazy(()=> import("@/views/main/Main-AddExam"))
const ShowUser = lazy(()=> import("@/views/main/Main-ShowUser"))
const ExamList = lazy(()=> import("@/views/main/Main-ExamList"))
const ExamEdit = lazy(()=> import("@/views/main/Main-ExamEdit"))
const ExamDetail = lazy(()=> import("@/views/main/Main-ExamDetail"))
const AddQuestions = lazy(()=> import("@/views/main/Main-AddQuestions"))
const EditQuestions = lazy(()=> import("@/views/main/Main-EditQuestions"))
const QuestionsType = lazy(()=> import("@/views/main/Main-QuestionsType"))
const WatchQuestions = lazy(()=> import("@/views/main/Main-WatchQuestions"))
const QuestionsDetail = lazy(()=> import("@/views/main/Main-QuestionsDetail"))
const ExaminationPapers = lazy(()=> import("@/views/main/Main-ExaminationPapers"))
const ExamPaperClassList = lazy(()=> import("@/views/main/Main-ExamPaperClassList"))
const ExamPaperClassmate = lazy(()=> import("@/views/main/Main-ExamPaperClassmate"))


export const components = {
    Menu,
    Room,
    Error,
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
    {
        path: "/",
        redirect: "/login",
        name: "/",
    },
    {
        path: "/index",
        name: "index",
        component: Home,
        children: [
            
            {
                path: '/index/menu',
                name: "添加菜单",
                component: Menu
            },
            {
                path: '/index/examPaperClassList',
                name: "批卷班级",
                component: ExamPaperClassList
            },
            {
                path: '/index/examPaperClassmate',
                name: "待批试卷",
                component: ExamPaperClassmate
            },
            {
                path: '/index/examEdit',
                name: "创建试卷",
                component: ExamEdit
            },
            {
                path: '/index/examDetail/:id',
                name: "试卷详情",
                component: ExamDetail
            },
            {
                path: '/index/editQuestions',
                name: "编辑试题",
                component: EditQuestions
            },
            {
                path: '/index/questionsDetail',
                name: "试题详情",
                component: QuestionsDetail
            },
            {
                path: '/index/examinationPapers/:id',
                name: "阅卷",
                component: ExaminationPapers
            },
            {
                path: '/index/addUser',
                name: "添加用户",
                component: AddUser
            },
            {
                path: '/index/showUser',
                name: "用户展示",
                component: ShowUser
            },
            {
                path: '/index/grade',
                name: '班级管理',
                component: Grade,
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
        ]
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: '/*',
        name: "404",
        component: Error
    }
];





