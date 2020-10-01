import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRecommend, fetchMoreRecommend } from "../../actions/match";
import Typography from "@material-ui/core/Typography";
import Gallery from "./Gallery";
import UserCard from "./UserCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button } from "@material-ui/core";

const Match = ({ getRecommend, match: { match, limit, count, offset, loading } }) => {
    console.log("MATCH component");
    useEffect(() => {
        console.log("MATCH userffect");
        getRecommend({ limit, offset });
    }, [getRecommend]);

    const handleClick = () => {
        console.log("click");
        dispatchEvent()
    }
    return (
        <Fragment>
            <Typography variant="h6">Matches: {match.length}</Typography>
            {/* <Gallery match={match} /> */}
            {console.log("SCROLL")}
            <Gallery match={match}></Gallery>
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
    fetchMoreRecommend: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    match: state.match,
});

export default connect(mapStateToProps, { getRecommend, fetchMoreRecommend })(Match);
