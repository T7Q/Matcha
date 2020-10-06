import React from "react";
import Match from "../common/matchGallery/GetMatches";
import HeaderScrollableTabs from "./HeaderScrollableTabs";
import Container from "@material-ui/core/Container";

const Matches = ({ match, history }) => {
    const { page } = match.params;

    // console.log("components/matches");
    // console.log("PAGE", page, "history", history);
    const route = "/match/" + page
    return (
        <Container fixed>
            <HeaderScrollableTabs page={page} history={history}>
                Horizontal scroll
            </HeaderScrollableTabs>
            {/* <Match route={route} filterIsOn={1}/> */}
        </Container>
    );
};

export default Matches;
