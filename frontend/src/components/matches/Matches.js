import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecommend } from '../../actions/match';
import Typography from '@material-ui/core/Typography';
import UserCard from './UserCard';



const Match = ({ getRecommend, match: { match, loading }  }) => {
    useEffect(() => {
        getRecommend();
    }, [getRecommend]);
    return (
        <Fragment>
            <Typography variant='h6'>Matches</Typography>
            <Typography variant='body1'></Typography>
            {match.map( mat =>{
                console.log(mat.user_id);
                return (<UserCard key={mat.user_id} card={mat} />)
            })}
        </Fragment>
    );
};

Match.propTypes = {
    getRecommend: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    match: state.match,
});

export default connect(mapStateToProps, { getRecommend })(Match);
