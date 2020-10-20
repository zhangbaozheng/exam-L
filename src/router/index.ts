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

