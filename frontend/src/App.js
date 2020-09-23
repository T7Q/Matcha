import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Likes from './components/likes/Likes';
import Matches from './components/matches/Matches';
import Profile from './components/profile/Profile';
import CreateProfile from './components/profile-form/CreateProfile';
import Chat from './components/chat/Chat';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
}

const App = () => (
    <Provider store={store}>
        <Router>
            <Fragment>
                <Navbar />
                <Route exact path='/' component={Landing} />
                <section className='container'>
                    <Switch>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/matches' component={Matches} />
                        <Route exact path='/messages' component={Chat} />
                        <Route exact path='/likes' component={Likes} />
                        <Route exact path='/profile' component={Profile} />
                        <Route exact path='/create-profile' component={CreateProfile} />
                    </Switch>
                </section>
            </Fragment>
        </Router>
    </Provider>
);

export default App;
