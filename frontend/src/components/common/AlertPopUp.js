import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AlertPopUp = ({ alerts }) =>
    alerts !== NULL &&
    alerts.length > 0 &&
    alerts.map((alert) => (
        <div key={alert.id} className="alert alert-danger">
            {alert.msg}
        </div>
    ));

AlertPopUp.propTypes = {
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(AlertPopUp);
