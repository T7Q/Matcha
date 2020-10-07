import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRecommend, fetchMore } from "../../../actions/match";
import Gallery from "./Gallery";
// import HeaderScrollableTabs from "./HeaderScrollableTabs";
// import MultipleSelect from "./MultipleSelect";
// import Filter from "./Filter";


// console.log("TYPE", type);

const Match = ({ getRecommend, fetchMore, match: { match, iEnd, loading }, path, route, filterIsOn }) => {
    // console.log("GetMatch component");

    useEffect(() => {
        getRecommend(route, filterIsOn);
    }, [getRecommend, route, filterIsOn]);
    
    const handleScroll = () => {
        const temp = window.innerHeight + window.scrollY;
        const temp2 = document.body.offsetHeight;
        // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (temp >= temp2) {
            fetchMore();
        }
    }
    window.addEventListener("scroll", handleScroll);
    return (
        <Fragment>
            <Gallery match={match} iEnd={iEnd} />
        </Fragment>
    );
};

Match.propTypes = {
    getRecommend: PropTypes.func.isRequired,
    fetchMore: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    route: PropTypes.string.isRequired,
    filterIsOn: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
    match: state.match,
});

export default connect(mapStateToProps, { getRecommend, fetchMore })(Match);
