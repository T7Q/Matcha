import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRecommend } from "../../actions/match";
import Typography from "@material-ui/core/Typography";
import Gallery from "./Gallery";

const Match = ({ getRecommend, match: { match, loading } }) => {
    useEffect(() => {
        getRecommend();
    }, [getRecommend]);
    return (
        <Fragment>
            <Typography variant="h6">Matches: {match.length}</Typography>
            <Gallery match={match} />
        </Fragment>
    );
};

Match.propTypes = {
    getRecommend: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    match: state.match,
});

export default connect(mapStateToProps, { getRecommend })(Match);
