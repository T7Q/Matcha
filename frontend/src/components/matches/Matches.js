import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRecommend, fetchMoreRecommend } from "../../actions/match";
import Typography from "@material-ui/core/Typography";
import Gallery from "./Gallery";
import UserCard from "./UserCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid, Button } from "@material-ui/core";

import { FETCH_MORE_MATCH } from '../../actions/types';


const fetchMore = () => dispatch => {
    console.log("Fetch more yay!");
    dispatch({
        type: FETCH_MORE_MATCH
    });
}

const Match = ({ getRecommend, fetchMore, match: { match, iStart, iEnd, limit, count, offset, loading } }) => {
    console.log("MATCH component");
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        getRecommend({ limit, offset });
        // document.getElementById("test").addEventListener("scroll", handleScroll);
    }, [getRecommend]);

    const handleClick = () => {
        console.log("click");
        fetchMore();
    }
    const handleScroll = (event) => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log("you're at the bottom of the page");
            fetchMore();
        }
    }
    
    return (
        <Fragment>
            <Typography variant="h6">Matches: {match.length}</Typography>
                {/* <div id="test" onScroll={handleScroll}> */}
                    <Grid  container spacing={3} >
                    {match.filter((elem, i) => i >= 0 && i < iEnd).map((mat) => {
                        return <UserCard key={mat.user_id} card={mat} />;
                    })}
                    </Grid>

                {/* </div> */}

            {/* <Gallery match={match} iStart ={iStart} iEnd={iEnd} onClick={handleScroll}/> */}
            {/* <Button variant="outlined" color="primary" onClick={handleClick}>
            More profiles
            </Button> */}
        </Fragment>
    );
};

Match.propTypes = {
    getRecommend: PropTypes.func.isRequired,
    fetchMore: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    match: state.match,
});

export default connect(mapStateToProps, { getRecommend, fetchMore })(Match);
