import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Section from '../components/Section';
import styles from '../styles/Prepare.module.css';
import Navbar from '../components/Navbar';

const Prepare = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event, sectionId) => {
    setSelectedFile(event.target.files[0]);
    setActiveSection(sectionId);
  };

  const uploadFile = async (sectionId) => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      if(sectionId === 1){
      const response = await axios.post('http://localhost:3001/test', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Assuming the server responds with the image name
      const imageName = response.data.fileName;
      // Navigate to '/ChatBot' with the image name passed as a prop
      navigate('/chat', { state: { imageName } });
      }
      else if(sectionId === 3){
        const response = await axios.post('http://localhost:3001/tech', formData, {
          headers : {
            'Content-Type' : 'multipart/form-date',
          },
        })
        const imageName = response.data.fileName;
        console.log(imageName);
        navigate('/tech-chat', {state : {imageName}});
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className={styles['prepare-container']}>
      <Navbar />
      <h2 className={styles['prepare-heading']}>Prepare For Your Interviews</h2>
      <div className={styles['sections-container']}>
        <Section
          title="Resume"
          description="Test your skills based on your Resume"
          selectedFile={selectedFile}
          handleFileChange={(e) => handleFileChange(e, 1)}
          uploadFile={() => uploadFile(1)}
          isActive={activeSection === 1}
        />
        <Section
          title="Job Description"
          description="Test yourself based on the Job Description"
          selectedFile={selectedFile}
          handleFileChange={(e) => handleFileChange(e, 2)}
          uploadFile={() => uploadFile(2)} 
          isActive={activeSection === 2}
        />
        <Section
          title="Technical Skills"
          description="Test yourself based on the technical skills"
          selectedFile={selectedFile}
          handleFileChange={(e) => handleFileChange(e, 3)}
          uploadFile={() => uploadFile(3)}
          isActive={activeSection === 3}
        />
        <Section
          title="Basics"
          description="Test yourself based on the fundamentals"
          selectedFile={selectedFile}
          handleFileChange={(e) => handleFileChange(e, 4)}
          uploadFile={() => uploadFile(4)}
          isActive={activeSection === 4}
        />
      </div>
    </div>
  );
};

export default Prepare;