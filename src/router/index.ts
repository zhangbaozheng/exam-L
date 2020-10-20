import Home from '@/views/Home'
import Addtest from '@/views/home-children/Addtest';
import Classify from '@/views/home-children/Classify';
import Examine from '@/views/home-children/Examine';
import Login from '@/views/Login';

const routes = [
    {
        path: '/',
        name:'/',
        redirect: '/index'
    },
    {
        path: '/index',
        name:'index',
        component: Home,
        children:[

            {
                path:'/index/addtest',
                name:'添加试题',
                component:Addtest
            },
            {
                path:'/index/classify',
                name:'试题分类',
                component:Classify
            },
            {
                path:'/index/examine',
                name:'查看试题',
                component:Examine
            }
        ]
    },
    {
        path:'/login',
        name:'login',
        component:Login
    }
]

export default routes;

