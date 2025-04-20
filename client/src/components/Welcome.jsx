import React from 'react';
import '../styles/Welcome.css';

const Welcome = () => {
    return (
        <div className="content">
            <div className="left-section">
                <div className="welcome-text">
                    Welcome to ProCareer !
                </div>
                <p className='text-s'>Discover the best tools for creating stunning resumes.</p>

                <div className="button-container">
                    <button className="primary-button">Learn More</button>
                    <button className="secondary-button">Get Started</button>
                </div>
            </div>
            <div className="right-section">
                <img
                    src='/assets/hero.jpg'
                    alt="Image"
                    className="hero-image"
                />
            </div>
        </div>
    );
};

export default Welcome;
