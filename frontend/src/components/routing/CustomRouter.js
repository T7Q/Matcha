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
import ProfileCreation from '../profile/CreateProfile';
import Matches from '../matches/Matches';
import Likes from '../likes/Likes';
// import NotFound from '../layout/NotFound';
import Chat from '../chat/Chat';
import Visits from '../visits/Visits';

const CustomRouter = ({ auth: { isAuthenticated, user } }) => {
    return (
        <Grid alignItems="center" justify="center" container item md={!isAuthenticated ? 6 : 12} xs={12}>
            <Route exact path="/" component={Landing} />
            <Box>
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
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <Route exact path="/complete" component={ProfileCreation} />
                    <Redirect exact from="/matches" to="/matches/recommended" />
                    <PrivateRoute exact path="/matches/:page?" component={Matches} />
                    <PrivateRoute exact path="/visits/:page?" component={Visits} />
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
