import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/Form/Register';
import Login from './components/auth/Login';
import ForgotPwd from './components/auth/ForgotPwd';
import UpdatePwd from './components/auth/UpdatePwd';
import Complete from './components/auth/Complete';
import Likes from './components/likes/Likes';
import Matches from './components/matches/Matches';
import Profile from './components/profile/Profile';
import CreateProfile from './components/profile-form/CreateProfile';
import Chat from './components/chat/Chat';
import Alert from './components/layout/Alert';
import Message from './components/layout/Message';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

// setAuthToken(localStorage.getItem('token'));

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path='/' component={Landing} />
                    <section className='container'>
                        <Alert />
                        <Switch>
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/forgetPwd' component={ForgotPwd} />
                            <Route exact path='/updatePwd' component={UpdatePwd} />
                            <Route exact path='/message' component={Message} />
                            <PrivateRoute exact path='/messages' component={Chat} />
                            <PrivateRoute exact path='/likes' component={Likes} />
                            <PrivateRoute exact path='/profile' component={Profile} />
                            <Route exact path='/create-profile' component={CreateProfile} />
                            <Route exact path='/complete' component={CreateProfile} />
                            <PrivateRoute exact path='/matches' component={Matches} />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
