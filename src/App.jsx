// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentUpload from './DocumentUpload/DocumentUpload';
import EmailTemplateList from './EmailTemplateList/EmailTemplateList';
import HomePage from './HomePage/HomePage';
import './tailwind.css'

const App = () => {
  return (

      <Routes>

        <Route path="/homepage" element={<HomePage />} />
        <Route path="/upload" element={<DocumentUpload />} />
        <Route path="/email-templates" element={<EmailTemplateList />} />

      </Routes>

  );
};

export default App;
