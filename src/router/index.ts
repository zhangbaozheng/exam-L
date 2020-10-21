
import Home from "@/views/Home"
import Login from "@/views/Login"
import Menu from '@/views/main/Main-Menu'
import Room from '@/views/main/Main-Room'
import Grade from '@/views/main/Main-Grade'
import Student from '@/views/main/Main-Student'
import AddUser from "@/views/main/Main-AddUser"
import AddExam from "@/views/main/Main-ExamEdit"
import ShowUser from "@/views/main/Main-ShowUser"
import ExamList from "@/views/main/Main-ExamList"
import ExamEdit from "@/views/main/Main-ExamEdit"
import ExamDetail from '@/views/main/Main-ExamDetail'
import ExamCreate from '@/views/main/Main-ExamCreate'
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
    ExamCreate,
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
        redirect: "/index",
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
                path: '/index/ExamPaperClassList',
                name: "批卷班级",
                component: ExamPaperClassList
            },
            {
                path: '/index/ExamPaperClassmate',
                name: "待批试卷",
                component: ExamPaperClassmate
            },
            {
                path: '/index/ExamEdit',
                name: "创建试卷",
                component: ExamEdit
            },
            {
                path: '/index/ExamDetail',
                name: "试卷详情",
                component: ExamDetail
            },
            {
                path: '/index/EditQuestions',
                name: "编辑试题",
                component: EditQuestions
            },
            {
                path: '/index/QuestionsDetail',
                name: "试题详情",
                component: QuestionsDetail
            },
            {
                path: '/index/ExaminationPapers',
                name: "阅卷",
                component: ExaminationPapers
            },

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
            },
            {
                path: "/index/examCreate",
                name: "添加试卷",
                component: ExamCreate,
            }
        ],
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
];





