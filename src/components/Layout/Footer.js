import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footerr'>
            <p className='text-center'>All Rights Reserved &copy; Sasta Store</p>
            <p className="text-center mt-1">
                <Link to="/about">About</Link> |
                <Link to="/contact">Contact</Link> |
                <Link to="/policy">Privacy Policy</Link>
            </p>
        </div>
    );
};

export default Footer;