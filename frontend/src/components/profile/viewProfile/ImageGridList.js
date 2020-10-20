import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        // height: 450,
    },
}));

const ImageGridList = ({ profile: { profile }, authId }) => {
    const classes = useStyles();
    // console.log('userid auth', authId);

    if (profile['photos'].length === 0) {
        return <div>No images in this account</div>;
    }
    // console.log('profile', profile.user_id, 'auth', authId);
    return (
        <div>
            <GridList className={classes.gridList} cols={1}>
                {profile['photos'].map((tile, index) => (
                    <GridListTile key={index} cols={1}>
                        <img src={tile.image_path} alt={tile.image_path} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
};
ImageGridList.propTypes = {
    profile: PropTypes.object.isRequired,
    authId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    authId: state.auth.user.userId,
});

export default connect(mapStateToProps, {})(ImageGridList);
