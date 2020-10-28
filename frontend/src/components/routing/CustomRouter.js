import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Grid, Box } from '@material-ui/core';

import PrivateRoute from './PrivateRoute';
import Login from '../auth/Login';
import ForgotPwd from '../auth/ForgotPwd';
import UpdatePwd from '../auth/UpdatePwd';
import Landing from '../layout/Landing';
import Register from '../profile/CreateAccount';
import ProfileView from '../profile/viewProfile/';
import ProfileCreation from '../profile/createProfile/';
import Settings from '../profile/profileSettings';
import EditProfile from '../profile/editProfile';
import Matches from '../matches/Matches';
import Likes from '../likes/Likes';
import Visits from '../visits/Visits';
// import NotFound from '../layout/NotFound';
import Chat from '../chat/';

const CustomRouter = () => {
    const { isAuthenticated, user, socket } = useSelector((state) => state.auth);

    return (
        <Grid justify="center" container item md={!isAuthenticated ? 6 : 12} xs={12}>
            <Route exact path="/" component={Landing} />
            <Box
                pt={{ xs: '0px', sm: '64px' }}
                mb={{ xs: '100px', sm: '0' }}
                width={isAuthenticated && user.status !== 1 ? '100%' : 'auto'}>
                <Switch>
                    {/* <Route exact path="/" component={Landing} /> */}
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/forgetPwd" component={ForgotPwd} />
                    <Route exact path="/updatePwd" component={UpdatePwd} />
                    <Route exact path="/account/activate" component={Login} />
                    <PrivateRoute exact path="/messages" component={Chat} />
                    <PrivateRoute exact path="/messages/:userId" component={Chat} />
                    <Redirect exact from="/likes" to="/likes/likesyou" />
                    <PrivateRoute exact path="/likes/:page?" socket={socket} component={Likes} />
                    <Redirect exact from="/profile" to="/profile/me" />
                    <PrivateRoute exact path="/profile/me" component={ProfileView} />
                    <PrivateRoute
                        socket={socket}
                        exact
                        path="/profile/:user_id?"
                        component={ProfileView}
                    />
                    <Route exact path="/complete" component={ProfileCreation} />
                    <PrivateRoute exact path="/settings" component={Settings} />
                    <PrivateRoute exact path="/settings/:type" component={Settings} />
                    <Redirect exact from="/matches" to="/matches/recommend" />
                    <PrivateRoute exact path="/matches/:page?" component={Matches} />
                    <Redirect exact from="/visits" to="/visits/allvisits" />
                    <PrivateRoute exact path="/visits/:page?" socket={socket} component={Visits} />
                    <PrivateRoute exact path="/profile/me/edit/:type?" component={EditProfile} />
                    {/* <Route component={NotFound} /> */}
                </Switch>
            </Box>
        </Grid>
    );
};

export default CustomRouter;
