// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/records?page=${currentPage}`);
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    try {
      const response = await axios.get(`/api/records?page=${currentPage}&search=${e.target.value}`);
      setRecords(response.data);
    } catch (error) {
      console.error('Error searching records:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search..." />
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.sno}>
              <td>{record.customername}</td>
              <td>{record.age}</td>
              <td>{record.phone}</td>
              <td>{record.location}</td>
              <td>{record.created_at.split('T')[0]}</td>
              <td>{record.created_at.split('T')[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
}

export default App;
