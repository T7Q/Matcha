import React from 'react';
import Switch from '@material-ui/core/Switch';

export default function Switches() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    console.log("state", state);
    console.log("new state", event.target.checked);
    // call for filter
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <Switch
        checked={state.checkedA}
        onChange={handleChange}
        color="primary"
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </div>
  );
}

// Switch.propTypes = {
//   updateFilter: PropTypes.func.isRequired,
//   match: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   match: state.match,
// });

// export default connect(mapStateToProps, { updateFilter })(Switches);
