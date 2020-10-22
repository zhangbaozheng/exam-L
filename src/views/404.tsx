import React, { Component } from 'react'
// const data = require('@/assets/404/index.html')
import data from '@/assets/404/index.html';
export default class Error extends Component {
    render() {
        return (
            <div className='wy-error'>
                <iframe
                    title="resg"
                    srcDoc={data}
                    style={{ width: '100%', border: '0px', height: '100%' }}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    scrolling="auto"
                />
            </div>
        )
    }
}
