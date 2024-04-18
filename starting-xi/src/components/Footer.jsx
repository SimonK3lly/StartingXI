import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="site-footer">
            <div className="site-footer-copyright">
                <p>© 2024 StartingXI. All rights reserved.</p>
            </div>
            <div className="site-footer-logo">
                <Link to="/">
                    <img className="site-footer-img" src="/assets/StartingXiLogo.svg" alt="StartingXI Logo" />
                </Link>
            </div>
        </footer>
    );
}
export default Footer;
