import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [submittedArray, setSubmittedArray] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setError('');
  };

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const handleSubmit = async () => {
    // Convert input string to array and remove extra quotes around values
    const arrayFromInput = inputValue.split(' ')
      .map(item => item.replace(/^"|"$/g, '').trim())  // Remove surrounding quotes if any
      .filter(item => item);

    if (arrayFromInput.length === 0) {
      setError('Please enter valid space-separated values.');
      return;
    }

    try {
      // Send the array to the server using Axios
      const res = await axios.post('http://localhost:9000/api/data', {
        array: arrayFromInput,
      });

      setResponse(res.data);
      setSubmittedArray(arrayFromInput); // Store the submitted array
    } catch (err) {
      setError('Error sending data to the server.');
      console.error(err);
    }
  };

  // Function to format the response data based on selected options
  const formatFilteredData = () => {
    if (!response) return '';

    let formattedData = '';
    if (selectedOptions.includes('Numbers')) {
      formattedData += `Numbers: ${response.numbers.join(', ')}\n`;
    }
    if (selectedOptions.includes('Alphabets')) {
      formattedData += `Alphabets: ${response.alphabets.join(', ')}\n`;
    }
    if (selectedOptions.includes('Highest Lowercase Alphabet')) {
      formattedData += `Highest Lowercase Alphabet: ${response.highest_lowercase_alphabet.join(', ')}\n`;
    }
    return formattedData.trim();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>21BCE9554</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter space-separated values"
        style={{ marginRight: '10px', width: '100%' }}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {response && (
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="dropdown">Select options:</label>
          <select
            id="dropdown"
            multiple
            value={selectedOptions}
            onChange={handleSelectChange}
            style={{ marginRight: '10px', width: '200px' }}
          >
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
          </select>
          <div style={{ marginTop: '20px' }}>
            <strong>Filtered Data:</strong>
            <pre>{formatFilteredData()}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
