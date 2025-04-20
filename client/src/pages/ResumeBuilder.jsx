import React from 'react';
import { Link } from 'react-router-dom';

const resumes = [
    { id: 1, previewUrl: '/assets/sample-resume2.jpg' },
    { id: 2, previewUrl: '/assets/sample-resume.png' },
    { id: 3, previewUrl: '/assets/sample-resume2.jpg' },
];

const ResumeBuilder = () => {
    return (
        <div>
            <h2>Build your Resume</h2>

            <Link to="/resume-builder/choose-template">
                <button>Create Resume</button>
            </Link>
        </div>
    );
};

export default ResumeBuilder;
