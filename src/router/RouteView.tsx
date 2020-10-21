import React from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'
import { _userInfo } from '@/api/index'
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

async function userInfo() {
    let result = await _userInfo();
    console.log(result);
    if(result.data.code === 1) {
        return true
    }else {
        return false
    }
}


export default function RouterView(props:IProps) {
    let coms = props.routes.filter(item=>item.component)
    let reds = props.routes.filter(item=>item.redirect)
    return (
        <Switch>
        {
            coms.map((item)=>{
                return <Route path={item.path} key={item.path} render={(props)=>{
                        if(userInfo()) {
                            return <item.component {...props} routes={item.children} key={item.path}></item.component>
                        } else {
                            return <Redirect to='/login'/>
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