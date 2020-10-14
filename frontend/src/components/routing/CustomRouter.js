import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import PrivateRoute from './PrivateRoute';
import Login from '../auth/Login';
import ForgotPwd from '../auth/ForgotPwd';
import UpdatePwd from '../auth/UpdatePwd';
import Landing from '../layout/Landing';
import Alert from '../layout/Alert';
import Message from '../layout/Message';
import Register from '../profile/CreateAccount';
import Profile from '../profile/Profile';
import ProfileCreation from '../profile/CreateProfile/';
import Matches from '../matches/Matches';
import Likes from '../likes/Likes';
// import NotFound from '../layout/NotFound';
import Chat from '../chat/Chat';
import Settings from '../profile/Settings';
import Visits from '../visits/Visits';
import EditProfile from '../profile/EditProfile/';

const CustomRouter = ({ auth: { isAuthenticated, user } }) => {
    return (
        <Grid justify="center" container item md={!isAuthenticated ? 6 : 12} xs={12}>
            <Route exact path="/" component={Landing} />
            <Box
                pt={{ xs: '0px', sm: '64px' }}
                mb={{ xs: '100px', sm: '0' }}
                // textAlign="center"
                width={isAuthenticated && user.status !== 1 ? '100%' : 'auto'}>
                <Alert />
                <Switch>
                    {/* <Route exact path="/" component={Landing} /> */}
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/forgetPwd" component={ForgotPwd} />
                    <Route exact path="/updatePwd" component={UpdatePwd} />
                    <Route exact path="/message" component={Message} />
                    <PrivateRoute exact path="/messages" component={Chat} />
                    <Redirect exact from="/likes" to="/likes/likesyou" />
                    <PrivateRoute exact path="/likes/:page?" component={Likes} />
                    <Redirect exact from="/profile" to="/profile/me" />
                    <PrivateRoute exact path="/profile/me" component={Profile} />
                    <PrivateRoute exact path="/profile/:user_id?" component={Profile} />
                    <Route exact path="/complete" component={ProfileCreation} />
                    <PrivateRoute exact path="/settings" component={Settings} />
                    <Redirect exact from="/matches" to="/matches/recommend" />
                    <PrivateRoute exact path="/matches/:page?" component={Matches} />
                    <Redirect exact from="/visits" to="/visits/newvisits" />
                    <PrivateRoute exact path="/visits/:page?" component={Visits} />
                    <PrivateRoute exact path="/profile/me/edit/:type?" component={EditProfile} />
                    {/* <Route component={NotFound} /> */}
                </Switch>
            </Box>
        </Grid>
    );
};

CustomRouter.propTypes = {
    auth: PropTypes.object,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(CustomRouter);
