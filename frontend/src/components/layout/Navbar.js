import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/" >
                    <i className="fas fa-moon"/> Astro Matcha
                </Link>
            </h1>
            <ul>
                <li>
                    <Link to='/matches'>Matches</Link>
                </li>
                <li>
                    <Link to='/messages'>Messages</Link>
                </li>
                <li>
                    <Link to='/likes'>Likes</Link>
                </li>
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>
                <li>
                    <Link to='/singout'>Sign out</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar