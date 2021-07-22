import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../routes/Routes'
const Layout = () => {
    return (
        <BrowserRouter>
            <div className="main">
                <Routes/>
            </div>
        </BrowserRouter>
    )
}

export default Layout
