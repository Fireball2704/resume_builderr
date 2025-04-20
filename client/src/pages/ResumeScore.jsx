import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ResumeScore.module.css'; // Import the CSS module file
import Navbar from '../components/Navbar'

const ResumeScore = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const test = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('http://localhost:3001/resumescore', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200){
        var feedback = response.data.feedback
        navigate('/feedback' , {state : {feedback}});
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
    <div className={styles['prepare-container']}>
      <h2 className={styles['prepare-heading']}>Find Your Score</h2>
      <div className={styles['file-input-container']}>
        <input type="file" onChange={handleFileChange} className={styles['file-input']} />
        <button onClick={test} disabled={!selectedFile} className={styles['upload-button']}>
          Upload File
        </button>
        {loading ? <p>Finding Your Score!</p> : console.log("Lol")}
      </div>
    </div>
    </div>
  );
};

export default ResumeScore;
