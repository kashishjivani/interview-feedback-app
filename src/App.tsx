import React, { useEffect, useState } from "react";
import "./App.css";
import StarRating from "./components/StarRating.tsx";

interface RowData {       // Structure of the Data
  id: number;
  name: string;
  status: string;
  feedback: string;
  rating: number;
}

function App() {
  const [data, setData] = useState<RowData[]>([   // Assigning the interface and initializing it using React State
    { id: 1, name: "", status: "", feedback: "", rating: 0 },
  ]);

  const addRow = (): void => {   // Adding a row when Add Record is clicked
    const newRow: RowData = {
      id: data.length + 1,
      name: "",
      status: "",
      feedback: "",
      rating: 0,
    };
    setData([...data, newRow]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, id: number): void => {
    const updatedData = data.map((row: RowData) => {  // Method for updating respective field when user enters or updates
      if (row.id === id) {
        return { ...row, [e.target.name]: e.target.value };
      }
      return row;
    });
    setData(updatedData);
  };

  const handleStarClick = (id: number, newRating: number): void => {  // Method for updating the star rating when user enters or updates
    const updatedData = data.map((row) => {
      if (row.id === id) {
        return { ...row, rating: newRating };
      }
      return row;
    });
    setData(updatedData);
  };

  const removeRow = (id: number): void => {  // Method for removing a record
    const updatedData = data.filter((row) => row.id !== id);
    setData(updatedData);
  };

  return (
    <div className="container">
      <div className="btn">
        {/* Button for adding a record */}
        <button onClick={addRow}>Add Record</button>  
      </div>
      <table>
        {/* Title for the columns */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Interview Status</th>
            <th>Interview Feedback</th>
            <th>Rating</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping over the data to display on the UI */}
          {data.map((row) => (
            <tr key={row.id}>
              <td>
                {/* Input field for Name */}
                <input
                  type="text"
                  value={row.name}
                  name="name"
                  onChange={(e) => handleInputChange(e, row.id)}
                />
              </td>
              <td>
                {/* Select field for Status */}
                <select
                  value={row.status}
                  name="status"
                  onChange={(e) => handleInputChange(e, row.id)}
                >
                  <option value="pending">Pending</option>
                  <option value="complete">Complete</option>
                </select>
              </td>
              <td>
                {/* Input field for Feedback */}
                <input
                  type="text"
                  value={row.feedback}
                  name="feedback"
                  onChange={(e) => handleInputChange(e, row.id)}
                />
              </td>
              <td>
                {/* Rendering a React Component for displaying Stars for Rating */}
                <StarRating
                  rating={row.rating}
                  id={row.id}
                  onStarClick={handleStarClick}
                />
              </td>
              <td>
                {/* Button for removing a record */}
                <button onClick={() => removeRow(row.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
