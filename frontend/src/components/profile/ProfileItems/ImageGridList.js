import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import tileData from './tileData';

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

const tileData = [
    {
        key: 1,
        img: "/cat.jpg",
        title: "Image",
        author: "author",
    },
    {
        key: 2,
        img: "/Photo_1601037282389_683.png",
        title: "Image",
        author: "author",
    },
    {
        key: 3,
        img: "/Photo_1601037282389_683.png",
        title: "Image",
        author: "author",
    },
    {
        key: 4,
        img: "/cat.jpg",
        title: "Image",
        author: "author",
    },
    {
        key: 5,
        img: "/Photo_1601037282389_683.png",
        title: "Image",
        author: "author",
    },
];
/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function ImageGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={1}>
        {tileData.map((tile) => (
          <GridListTile key={tile.key} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
