
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRecommend, fetchMore } from "../../actions/match";
import Typography from "@material-ui/core/Typography";
import Gallery from "./Gallery";
import HeaderScrollableTabs from "./HeaderScrollableTabs";

// console.log("TYPE", type);

const Match = ({ getRecommend, fetchMore, match: { match, iEnd, loading }, path }) => {
    // console.log("MATCH component");
    console.log("PATH", path);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        getRecommend(path);
    }, [getRecommend, path]);

    // console.log("TYPE", path);
    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            // console.log("you're at the bottom of the page");
            fetchMore();
        }
    };

    return (
        <Fragment>
            <HeaderScrollableTabs variant="h6" match={match} iEnd={iEnd}>Horizontal scroll</HeaderScrollableTabs>
            <Typography variant="h6">Matches: {match.length}</Typography>
            {/* <Gallery match={match} iEnd={iEnd} /> */}
        </Fragment>
    );
};

Match.propTypes = {
    getRecommend: PropTypes.func.isRequired,
    fetchMore: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    match: state.match,
});

export default connect(mapStateToProps, { getRecommend, fetchMore })(Match);
