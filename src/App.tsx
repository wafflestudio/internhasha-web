import React, { useState } from 'react';

export const App = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleButtonClick = async () => {
    try {
      const res = await fetch(`http://43.201.27.77:8080/api/echo/${message}`);
      const data = await res.text();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('Error fetching data. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Echo Message</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="Type your message"
        style={{ padding: '10px', width: '300px', fontSize: '16px' }}
      />
      <button
        onClick={() => void handleButtonClick()}
        style={{
          padding: '10px 20px',
          marginLeft: '10px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Send
      </button>
      <div style={{ marginTop: '20px', fontSize: '18px', color: '#333' }}>
        <strong>Response:</strong> {response}
      </div>
    </div>
  );
};
