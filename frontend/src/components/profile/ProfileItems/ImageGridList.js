import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import tileData from './tileData';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
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

const ImageGridList = ({ profile: { profile} }) => {
  const classes = useStyles();

  if (profile['photos'].length === 0) {
    return (
      <div>
        No images in this account
      </div>
    )
  }
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={1}>
        {profile['photos'].map((tile, index) => (
          <GridListTile key={index} cols={1}>
            <img src={tile.image_path}  alt={tile.image_path}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
ImageGridList.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {  })(ImageGridList);
