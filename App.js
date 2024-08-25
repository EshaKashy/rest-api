import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [filteredResponse, setFilteredResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate JSON input
    try {
      JSON.parse(jsonData);
    } catch (error) {
      alert('Invalid JSON format.');
      return;
    }

    // Make API call
    try {
      const res = await axios.post('http://localhost:3000/bfhl', { data: JSON.parse(jsonData) });
      setFilteredResponse(res.data);
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  const handleFilterChange = (event) => {
    setSelectedFilters(event.target.value);
  };

  const renderFilteredResponse = () => {
    if (!filteredResponse) {
      return null;
    }

    // Filter response based on selected filters
    const filteredData = filteredResponse.data.filter((item) => {
      if (selectedFilters.includes('Numbers') && !isNaN(item)) {
        return true;
      }
      return false;
  });
  return (
    <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      <h1>Frontend Application</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="jsonData">Enter JSON:</label>
        <textarea id="jsonData" value={jsonData} onChange={(e) => setJsonData(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <div>
        <label htmlFor="filters">Multi Filter:</label>
        <select id="filters" multiple onChange={handleFilterChange}>
          <option value="Numbers">Numbers</option>
        </select>
      </div>
      {renderFilteredResponse()}
    </div>
  );
}

export default App;
