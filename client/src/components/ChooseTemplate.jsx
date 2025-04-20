import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import styles from '../styles/ChooseTemplate.module.css';
const ChooseTemplate = () => {
    return (
        <div className={styles['choose-template-container']}>
            <Navbar />
            <div className={styles['choose-template-content']}>
                <h1>Choose Your Resume Template</h1>
                <div className={styles['template-gallery']}>
                    <div className={styles['template-item']}>
                        <Link to="/resume-builder/edit-details">
                            <img src='/assets/sample-resume.png' alt="Sample Resume" />
                        </Link>
                        <p>Template 1</p>
                    </div>
                    {/* Add more template items here */}
                </div>
            </div>
        </div>
    );
};

export default ChooseTemplate;
