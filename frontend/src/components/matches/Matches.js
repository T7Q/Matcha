import React from "react";
import Match from '../common/matchGallery/GetMatches'
import HeaderScrollableTabs from "./HeaderScrollableTabs";
import Container from '@material-ui/core/Container';



const Matches = ({ match, history }) => {
    const { page } = match.params; 

    // console.log("components/matches");
    // console.log("PAGE", page, "history", history);

    return (
        <div>
            <Container fixed>
                <HeaderScrollableTabs variant="h6" page={page} history={history}>Horizontal scroll</HeaderScrollableTabs>
                <Match route="/match/recommend" filterIsOn={1}/>
            </Container>
        </div>
    );
};

export default Matches;

