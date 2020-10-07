import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider({ title, min, max }) {
    // console.log("title", title);
  
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 20020]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log("SLIDER CHANGE", newValue);
    
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {title}
      </Typography>
      <Slider
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
