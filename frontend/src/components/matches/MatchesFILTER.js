
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFiltered, fetchMore } from "../../actions/match";
import Typography from "@material-ui/core/Typography";
import Gallery from "../matchGallery/Gallery";
import HeaderScrollableTabs from "./HeaderScrollableTabs";
import MultipleSelect from "../matchGallery/MultipleSelect";
import Filter from "./Filter";


// console.log("TYPE", type);

const Match = ({ getFiltered, fetchMore,  match: { match, filter, iEnd, loading }, path }) => {
    // console.log("MATCH component");
    // console.log("PATH", path);

    console.log("NEW filter");
    // console.log("component match", filter);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        getFiltered(filter);
    }, [getFiltered, filter]);


    // console.log("TYPE", path);
    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            // console.log("you're at the bottom of the page");
            fetchMore();
        }
    };

    return (
        <Fragment>
            <Filter>here</Filter>
            <HeaderScrollableTabs variant="h6" match={match} iEnd={iEnd}>Horizontal scroll</HeaderScrollableTabs>
            <Typography variant="h6">Matches: </Typography>
            {/* <Typography variant="h6">Matches: {match.length}</Typography> */}
            <Gallery match={match} iEnd={iEnd} />
        </Fragment>
    );
};

Match.propTypes = {
    getFiltered: PropTypes.func.isRequired,
    fetchMore: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    match: state.match,
});

export default connect(mapStateToProps, { getFiltered, fetchMore })(Match);
