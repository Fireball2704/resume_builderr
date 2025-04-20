import React from 'react'
import LandingPage from './pages/LandingPage'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import ResumeBuilder from './pages/ResumeBuilder'
import ResumeScore from './pages/ResumeScore'
import Prepare from './pages/Prepare'
import ChooseTemplate from './components/ChooseTemplate';
import EditDetails from './pages/EditDetails';
import ChatBot from './pages/ChatBot';
import Feedback from './pages/Feedback';
import Chatech from './pages/ChatBot-Tech';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/resume-builder/choose-template' element={<ChooseTemplate />} />
        <Route path='/resume-builder/edit-details' element={<EditDetails />} />
        <Route path='/resume-score' element={<ResumeScore />} />
        <Route path='/prepare' element={<Prepare />} />
        <Route path='/chat' element={<ChatBot />} />
        <Route path='/feedback' element={< Feedback />} />
        <Route path='/tech-chat' element={< Chatech />} />
      </Routes>
    </div>
  )
}

export default App