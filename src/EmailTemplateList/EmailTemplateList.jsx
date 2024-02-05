import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './EmailTemplateList.css';

const EmailTemplateList = () => {
  const emailTemplates = useSelector((state) => state.email.emailTemplates || []);
  const [copiedIndices, setCopiedIndices] = useState({}); // Tracks copied state for each button

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedIndices({ ...copiedIndices, [index]: true });
        setTimeout(() => setCopiedIndices({ ...copiedIndices, [index]: false }), 2000); // Reset after 2 seconds
      })
      .catch(err => console.error('Error in copying text: ', err));
  };

  return (
    <div className="background">
      <div className="email-container">
        <div className="template-cards">
          {emailTemplates.map((template, index) => (
            <div key={index} className="template-card">
              <div className="template-header">
                <strong>Recipient:</strong> {template.recipient}
                <button 
                  onClick={() => copyToClipboard(template.recipient, `recipient-${index}`)}
                  className={`copy-button ${copiedIndices[`recipient-${index}`] ? 'copied' : ''}`}
                >
                  {copiedIndices[`recipient-${index}`] ? '✓' : 'Copy'}
                </button>
              </div>
              <div className="template-subject">
                <strong>Subject:</strong> {template.subject}
                <button 
                  onClick={() => copyToClipboard(template.subject, `subject-${index}`)}
                  className={`copy-button ${copiedIndices[`subject-${index}`] ? 'copied' : ''}`}
                >
                  {copiedIndices[`subject-${index}`] ? '✓' : 'Copy'}
                </button>
              </div>
              <div className="template-body">
                <strong>Body:</strong> {template.body}
                <button 
                  onClick={() => copyToClipboard(template.body, `body-${index}`)}
                  className={`copy-button ${copiedIndices[`body-${index}`] ? 'copied' : ''}`}
                >
                  {copiedIndices[`body-${index}`] ? '✓' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateList;
