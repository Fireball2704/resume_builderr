import React from 'react';
import '../styles/ResumeList.css';

const ResumeList = ({ resumes }) => {
    return (
        <div className="resume-list">
            <p>My Resumes</p>
            {resumes.map((resume, index) => (
                <div key={index} className="resume-item">
                    <img src={resume.previewUrl} alt={`Resume ${index + 1}`} />
                </div>
            ))}
        </div>
    );
};

export default ResumeList;
