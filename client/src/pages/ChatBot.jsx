import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ChatBot.css";
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

function ChatBot() {
  const location = useLocation();
  const imageName = location.state.imageName;
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [progress, setProgress] = useState(0);
  console.log(userAnswers);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/extract", {
          imageName,
        });

        const extractedQuestions = response.data.questions;

        if (extractedQuestions && extractedQuestions.length > 0) {
          setQuestions(extractedQuestions);
          setLoading(false);
        } else {
          console.error("No questions extracted");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, [imageName]);

  useEffect(() => {
    if (!loading && questions.length > 0) {
      if (currentQuestionIndex < questions.length) {
        const isQuestionDisplayed = messages.some(
          (message) => message.text === questions[currentQuestionIndex]
        );

        if (!isQuestionDisplayed) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: questions[currentQuestionIndex], sender: "bot" },
          ]);
        }
      }
    }
  }, [loading, questions, currentQuestionIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessages = [...messages, { text: inputMessage, sender: "user" }];
      setMessages(newMessages);
      setUserAnswers((prevAnswers) => [...prevAnswers, inputMessage]);
      setInputMessage("");
      handleNextQuestion();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log("No more questions");
      setShowEvaluation(true);
      try {
        axios.post("http://localhost:3001/evaluate", {
          questions,
          userAnswers,
          imageName,
        }).then((res) => {
          let feedback = res.data.feedback;
          console.log(res.status);
          if (res.status === 200) {
            console.log("Redirecting...");
            navigate("/feedback", { state: { feedback } });
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">ChatBot</h1>
      {loading ? (
        <div className="loading-animation"> Please wait while we get questions for you<CircularProgress /></div>
      ) : showEvaluation ? (
        <p className="eval-text"><Box sx={{ width: '100%', marginTop: '-20px' }}>
          Please hang on we are Evaluating your answers <LinearProgress variant="determinate" value={progress} sx={{ marginTop: '10px' }} />
        </Box></p>
      ) : (
        <div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === "bot" ? "bot-message" : "user-message"
                  }`}
              >
                <span className="message-sender">
                  {message.sender === "bot" ? "Bot:" : "You:"}
                </span>{" "}
                {message.text}
              </div>
            ))}
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Type your answer..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="message-input"
            />
            <button
              onClick={handleSendMessage}
              className="send-button"
              disabled={showEvaluation}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
