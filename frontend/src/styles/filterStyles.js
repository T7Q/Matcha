import { makeStyles } from '@material-ui/core/styles';

export const filterStyles = makeStyles((theme) => ({
    toggle: {
        margin: 0,
        padding: 0,
        color: theme.palette.text.secondary,
        fontSize: '50px',
    },
    filter: {
        color: theme.palette.text.secondary,
        textTransform: 'capitalize',
        padding: 0,
        '&.MuiButton-root, &.Mui-disabled': {
            backgroundColor: '#0c1023',
            color: theme.palette.text.secondary,
            textTransform: 'capitalize',
            padding: 0,
            '&.MuiButtonLabel': {
                alignItems: 'center',
            },
        },
        fontSize: 'medium',
    },
    sort: {
        maxWidth: '160px',
        borderBottom: `1px solid #10183c`,
        '& li:active': {
            backgroundColor: 'red',
            color: 'blue',
        },
    },
    tags: {
        '& .MuiChip-root': {
            color: 'green',
        },
        '& .MuiChip-label': {
            color: 'blue',
        },
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    row: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
    },
}));
