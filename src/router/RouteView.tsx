import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
interface IRoute {
    path?: string
    component?: any
    redirect?: string
    isLogin?: boolean
    children?: IRoute[]
    name: string 
}

interface IProps {
    routes: IRoute[]
}

export default function RouterView(props:IProps) {
    let coms = props.routes.filter(item=>item.component)
    let reds = props.routes.filter(item=>item.redirect)
    return (
        <Switch>
        {
            coms.map((item)=>{
                return <Route path={item.path} key={item.path} render={(props)=>{
                    if(item.isLogin) {
                        if(!sessionStorage.getItem('token')) {
                            return <Redirect to='/login'/>
                        }
                    }else {
<<<<<<< HEAD
                        return <item.component {...props} routes={item.children} key={item.path}></item.component>
=======
                        return <item.component {...props} routes={item.children}></item.component>
>>>>>>> 290c56ec3b09146271dbb539823444cc5a937bd6
                    }
                }}></Route>
            })
        }
        {
            reds.map((item)=>{
                return <Redirect to={item.redirect as string} key={item.redirect}/>
            })
        }
        </Switch>
    )
}