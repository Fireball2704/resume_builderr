import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    return (
        <nav className="navbar">
            <div className="logo">ProCareer</div>
            {isAuthenticated && (
                <ul className="nav-links">  
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/resume-builder/choose-template">Resume Builder</Link></li>
                    <li><Link to="/resume-score">Resume Score</Link></li>
                    <li><Link to="/prepare">Prepare</Link></li>
                </ul>
            )}
            <div className="login-container">
                {isAuthenticated ? <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className='login-button'>Logout</button> : <button onClick = {() => {loginWithRedirect()}} className='login-button'>Login</button>}
            </div>
        </nav>
    );
};

export default Navbar;
