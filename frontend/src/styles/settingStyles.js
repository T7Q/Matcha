import { makeStyles } from "@material-ui/core/styles";

export const settingStyles = makeStyles((theme) => ({
    title: {
        color: "#219bf1",
    },
    tabs: {
        padding: 0,
        '& .MuiTab-wrapper': {
            flexDirection: 'row',
            justifyContent: 'start',
            // color: 'blue',
        },
        // '& .MuiTouchRipple': {
        //     root:{
        //         border: "1px solid pink",
        //         height: "100px",  
        //     }
        // }, PINK OVERLAY
        '& .MuiTab-root': {
            padding: 0,
        },
    },
    notification: {
        justifyContent: "space-between",
        marginLeft: 0, 
        marginRight: 0 

    },


}));
