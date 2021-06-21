import React from 'react'
import Header from './components/Header'

import { Route, Switch } from 'react-router-dom'
import Signup  from './components/user/Signup'
import  Login  from './components/user/Login'
import HomePage from './components/user/HomePage'
const MainRouter = () => {
    return (
        <>
            <Header />
            <Switch>
                <Route exact path='/' component={Signup} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/homepage' component={HomePage} />

            </Switch>
            {/* <Sticky /> */}
        </>
    )
}

export default MainRouter
