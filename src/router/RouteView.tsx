import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
interface IRoute {
    path?: string
    component?: any
    redirect?: string
    isLogin?: boolean
    children?: IRoute[]
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
                        return <item.component {...props} routes={item.children}></item.component>
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