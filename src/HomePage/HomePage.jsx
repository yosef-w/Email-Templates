import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { setUserName } from '../Redux/Actions'; 
import './HomePage.css';

const HomePage = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleContinue = () => {
    console.log('Name before dispatch:', name);
    dispatch(setUserName(name));
    navigate('/upload'); // Navigate to '/upload' after dispatch
  };

  return (
    <div className="background">
      <div className="form-container">
        <h2 className="title">
          Welcome back! Please enter your name:
        </h2>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Your Name"
            className="input-field"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button 
            className="submit-button"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
