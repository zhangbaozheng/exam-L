import React, { Component } from 'react'
import RouterView from '@/router/RouteView'
interface IRoute {
    path?: string
    component?: any
    redirect?: string
    isLogin?: boolean
    children?: IRoute[]
    name: string
}

interface Props {
    routes: IRoute[]
}
interface State {

}
class exam extends Component<Props, State>{
    render() {
        return (
            <div className='s-exam'>
                  <RouterView routes={this.props.routes}></RouterView>
            </div>
        )
    }
}

export default exam
