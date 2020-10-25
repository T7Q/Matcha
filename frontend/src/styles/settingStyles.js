import { makeStyles } from "@material-ui/core/styles";

export const settingStyles = makeStyles((theme) => ({
    title: {
        color: "#219bf1",
    },
    tabs: {
        '&.MuiTab, &.MuiTab-wrapper': {
            flexDirection: 'row',
            justifyContent: 'start',
        },
        flexDirection: 'row',
        justifyContent: 'start',
        // MuiTab: {
        //     wrapper: {
        //         flexDirection: 'row',
        //         justifyContent: 'start',
        //     },
        // },
    }


}));
