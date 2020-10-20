import React, { Component } from 'react';
import RouterView from '@/router/RouteView';
interface IPaper{
    routes:any
}
class Paper extends Component<IPaper> {
    render() {
        return (
            <div>
                <RouterView routes={this.props.routes}></RouterView>
            </div>
        );
    }
}

export default Paper;