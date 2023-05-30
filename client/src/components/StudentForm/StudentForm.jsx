import React, { useState } from 'react';
import QRCode from 'qrcode.react';
function StudentForm() {
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [purpose, setPurpose] = useState('');
    const [date, setDate] = useState('');
    const [qrCodeData, setQRCodeData] = useState('');
    
    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Send the gate pass application data to the server for further processing
      // You can make an API call here to send the data
      // Example: sendGatePassApplication(studentId, name, purpose, date);
    };
    
    return (
      <div>
        <h1>Gate Pass Application</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
  
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
  
          <label htmlFor="purpose">Purpose:</label>
          <input
            type="text"
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
  
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
  
          <button type="submit">Submit</button>
        </form>
        <div>
          <QRCode value={qrCodeData} />
        </div>
      </div>
    );
  }
  
  export default StudentForm;
  