
interface IRoute {
    path?: any;
    children?: IRoute[];
    name: string;
}

const NavList: IRoute[] = [
    {
        name: '试题管理',
        children: [
            {   
                path: '/index/addQuestions',
                name: '添加试题'
            },
            {   
                path: '/index/questionsType',
                name: '试题分类'
            },
            {   
                path: '/index/watchQuestions',
                name: '查看试题'
            }
        ]
    },
    {
        name: '用户管理',
        children: [
            {   
                path: '/index/useradd',
                name: '添加用户'
            },
            {   
                path: '/index/showUser',
                name: '用户展示'
            }
        ]
    },
    {
        name: '考试管理',
        children: [
            {   
                path: "/index/addExam",
                name: '添加考试'
            },
            {   
                path: "/index/examList",
                name: '试卷列表'
            }
        ]
    },
    {
        name: '班级管理',
        children: [
            {   
                path: '/index/Grade',
                name: '班级管理'
            },
            {   
                path: '/index/room',
                name: '教室管理'
            },
            {   
                path: '/index/student',
                name: '学生管理'
            }
        ]
    },
    {
        name: '阅卷管理',
        children: [
            {   path: '/index/ExamPaperClassList',
                name: '待批班级'
            }
        ]
    },
]

export default NavList