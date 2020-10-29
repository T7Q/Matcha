import React from 'react';
import { useSelector } from 'react-redux';
import { GridList, GridListTile } from '@material-ui/core';
import { profileStyles } from '../../../styles/profileStyles';

const ImageGridList = () => {
    const classes = profileStyles();
    const { profile } = useSelector((state) => state.profile);

    if (profile['photos'].length === 0) {
        return <div>No images in this account</div>;
    }

    return (
        <div>
            <GridList cellHeight="auto" className={classes.gridList} cols={1}>
                {profile['photos'].map((tile, index) => (
                    <GridListTile key={index} cols={1}>
                        <img src={tile.image_path} alt={tile.image_path} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
};

export default ImageGridList;
