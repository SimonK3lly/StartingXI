import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="navbar">
            <Link className="nav-logo" to="/">
                <img src="/assets/StartingXiLogo.svg" alt="StartingXI Logo" />
            </Link>
            <div className="nav-mainlinks">
                <Link to="/history" className="nav-mainlinks-history">History</Link>
                <Link to="/game" className="nav-mainlinks-play"><h1>Play</h1></Link>
                <Link to="/leaderboards" className="nav-mainlinks-leaderboard">Leaderboard</Link>
            </div>
            <button id="sidebarToggle" className="sidebar-toggle">☰</button>
        </nav>
    );
}
export default Header;
