import React from 'react';
import styles from '../styles/Section.module.css'; // Import the CSS module file

const Section = ({ title, description, selectedFile, handleFileChange, uploadFile, isActive }) => {
    return (
        <div className={styles['section-container']}>
            <h3 className={styles['section-title']}>{title}</h3>
            <p className={styles['section-description']}>{description}</p>
            <div className={styles['file-input-container']}>
                <input type="file" onChange={handleFileChange} className={styles['file-input']} />
                <button onClick={uploadFile} disabled={!selectedFile || !isActive} className={styles['upload-button']}>
                    Upload Resume
                </button>
            </div>
        </div>
    );
};

export default Section;
