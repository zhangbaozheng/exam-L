import Home from '@/views/Home'
import Login from '@/views/Login'

const routes = [
    {
        path: '/',
        redirect: '/index',
        name: '/'
    },
    {
        path: '/index',
        name: 'index',
        component: Home,
        children: [
            {
                name: '123'
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

export default routes;


let nav = [
    {
        name: '试题管理',
        children: [
            {
                name: '添加试题'
            },
            {
                name: '试题分类'
            },
            {
                name: '查看试题'
            }
        ]
    },
    {
        name: '用户管理',
        children: [
            {
                name: '添加用户'
            },
            {
                name: '用户展示'
            }
        ]
    },
    {
        name: '考试管理',
        children: [
            {
                name: '添加考试'
            },
            {
                name: '试卷列表'
            }
        ]
    },
    {
        name: '班级管理',
        children: [
            {
                name: '班级管理'
            },
            {
                name: '教室管理'
            },
            {
                name: '学生管理'
            }
        ]
    },
    {
        name: '阅卷管理',
        children: [
            {
                name: '待批班级'
            }
        ]
    },
]
