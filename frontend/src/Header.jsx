import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import logo from './assets/logo.png';

const Header = () => {

    const [contact, setContact] = useState(false);
    const handleContact = () => {
        setContact(true);
    }
    const handleTimes = () => {
        setContact(false);
    }

  return (
    <div className='header-container'>
        <div className="left-head">
            <img src={logo} alt="logo" />
        </div>
        <div className="right-head">
            <nav>
                <ul>
                    <li><Link to='/' className='link'>Home</Link></li>
                    <li onClick={handleContact}>Contact</li>
                    <li><Link to='/' className='link'>About</Link></li>
                    <li><Link to='/login' className='link'>Login</Link></li>
                </ul>
            </nav>
            {contact && (<div className="contacts">
                <i className='fas fa-times' onClick={handleTimes}></i>
                <p>Mobile: +91 9952522117</p>
                <p>LinkedIn: <a href="https://www.linkedin.com/in/ammaiyappa-agency-a4319a336/" target='_blank'>ammaiyappa</a></p>
            </div>)}
        </div>
    </div>
  )
}

export default Header