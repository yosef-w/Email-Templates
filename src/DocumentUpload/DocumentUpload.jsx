// DocumentUpload.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveEmailTemplate } from '../Redux/Actions';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import './DocumentUpload.css'


const DocumentUpload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);

  const nameData = useSelector((state) => state.name)

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
            setUploadedFile(sheet);
          } catch (error) {
            console.error('Error reading the file:', error);
            alert('Error reading the file. Please make sure it is a valid Excel file (XLSX).');
          }
        };

        reader.readAsArrayBuffer(file);
      } else {
        alert('Please upload a valid Excel file (XLSX).');
      }
    }
  };

  const processFile = () => {
    if (!uploadedFile) {
      alert('Please upload a file first.');
      return;
    }
  
    const emailTemplates = [];
  
    // Assuming the first row contains headers
    const headers = uploadedFile[0];
    const nameIndex = headers.indexOf('Name');
    const prescriberNameIndex = headers.indexOf('Prescriber Name');
    const providerNumberIndex = headers.indexOf('Provider Number');
    const prescriberFaxNumberIndex = headers.indexOf('Prescriber Fax #');
  
    uploadedFile.forEach((row, index) => {
      if (index === 0) return; // Skip header row
  
      const Name = row[nameIndex];
      const prescriberName = row[prescriberNameIndex];
      const providerNumber = row[providerNumberIndex];
      const prescriberFaxNumber = row[prescriberFaxNumberIndex];
  
      // Ensure prescriberFaxNumber is a string before replacing characters
      const cleanFaxNumber = String(prescriberFaxNumber).replace(/[()-]/g, '');
  
      const recipient = `1${cleanFaxNumber}@srfax.com`;
      const subject = `ATTN: ${prescriberName}, MD: Plan of Treatment - please sign & fax back`;
      const body = (
        <p>
          Hello,
          <br></br>
          <br></br>
          Float Health is providing home nursing services for your patient, {Name}. The new Plan of Treatment for your patient is included here.
          <br></br>
          <br></br>
          This form is required to be completed and signed by {prescriberName} every 60 days for all patients receiving home nursing services.
          <br></br>
          <br></br>
          Please review the entire form then sign and date on page 4. If applicable, please select also the appropriate venous access removal plan on page 4.
          <br></br>
          <br></br>
          The completed form can be returned via secure email to pots@float.health or by fax to 858-777-3626.
          <br></br>
          <br></br>
          Thanks and Regards,
          <br></br>
          <br></br>
          {nameData.userName}
          <br></br>
          Informatics Support Specialist
          <br></br>
          <a href="https://float.health/">Float Health</a>
          <br></br>
          <br></br>
          P: (858) 290-7828
          <br></br>
          F: (858) 777-3626
          <br></br>
          <br></br>
          The information contained in this communication is confidential and authorized for use by the intended recipient only. If you are not the intended recipient, let it be known that any use, disclosure, copying, distribution, or taking action with any of the contents of this information is strictly prohibited. We request that you notify us immediately at 858-290-7828 if this is received in error.
        </p>
      );
  
      emailTemplates.push({ recipient, subject, body });
    });
  
    dispatch(saveEmailTemplate(emailTemplates));
  
  
    // Navigate to the new page after processing
    navigate('/email-templates');
  };
  

  return (
    <div className="background">
      <div className="form-container">
        <h1>Document Upload</h1>
        <div className="input-container">
            <input type="file" onChange={handleFileUpload} />
        </div>
        <button className='process-button' onClick={processFile}>Process</button>
      </div>
    </div>
  );
};

export default DocumentUpload;
