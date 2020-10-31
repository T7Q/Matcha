import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import { getRecommend, fetchMore } from '../../../actions/match';
import Gallery from './Gallery';
import Spinner from '../../layout/Spinner';

const GetMatches = ({ route, filterIsOn, reset }) => {
    const dispatch = useDispatch();
    const { match, loading } = useSelector((state) => state.match);

    useEffect(() => {
        dispatch(getRecommend(route, filterIsOn));
    }, [dispatch, route, filterIsOn, reset]);

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
            dispatch(fetchMore());
        }
    };
    window.addEventListener('scroll', handleScroll);

    return loading ? (
        <Spinner />
    ) : match.length === 0 ? (
        <Typography mt={4} pt={4} variant="h6">
            No matches found.
        </Typography>
    ) : (
        <Fragment>
            <Gallery />
        </Fragment>
    );
};

export default GetMatches;
