import React from "react";
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">HOROSCOPE WHEEL HERE</h1>
                    <p className="lead">
                    <div class="buttons">
                        <Link to="/register" className="btn btn-primary">Register</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                    </p> 
                </div>
            </div>
        </section>
    );
};

export default Landing
