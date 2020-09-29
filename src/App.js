import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [input, setInput] = useState("")
  useEffect(() => {
    axios.get("https://randomuser.me/api/?nat=us&results=200")
      .then(({ data }) => {
        setEmployees(data.results)
        setFiltered(data.results)
      })
  }, [])

  const handleChange = ({target:{value}}) => {
    const filteredEmployees = employees.filter(item => {
      return item.name.first.toLowerCase().includes(value) || item.name.last.toLowerCase().includes(value)
    });
    setFiltered(filteredEmployees)
  }
  return (
    <>
      <div className="jumbotron">
        <h1 style={{ textAlign: 'center' }}>
          Employee Directory
        </h1>
      </div>
      <div className="container">
        <input onChange={handleChange} className="form-control mb-3 justify-self-center" placeholder="search an employee here" />
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Picture</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item =>
              <tr>
                <th scope="row"><img src={item.picture.thumbnail} /></th>
            <td>{item.name.first}</td>
                <td>{item.name.last}</td>
                <td>{item.email}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
