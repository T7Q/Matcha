import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRecommend, fetchMoreRecommend } from "../../actions/match";
import Typography from "@material-ui/core/Typography";
import Gallery from "./Gallery";
import UserCard from "./UserCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button } from "@material-ui/core";

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
        console.log("MATCH userffect");
        getRecommend({ limit, offset });
    }, [getRecommend]);

    const handleClick = () => {
        console.log("click");
        fetchMore();
    }
    return (
        <Fragment>
            <Typography variant="h6">Matches: {match.length}</Typography>
            <Gallery match={match} iStart ={iStart} iEnd={iEnd}/>
            {console.log("SCROLL")}
            {/* <Gallery match={match}></Gallery> */}
            <Button variant="outlined" color="primary" onClick={handleClick}>
            More profiles
            </Button>
            {/* <InfiniteScroll
                dataLength={match.length}
                next={fetchMoreRecommend({ limit, offset, count, match} )}
                hasMore={match.length < 20}
                loader={<h4>Loading...</h4>}>
                {match.map((mat) => {
                    console.log("user id", mat.user_id);
                return <UserCard key={mat.user_id} card={mat} />;
                })}
            </InfiniteScroll> */}
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
