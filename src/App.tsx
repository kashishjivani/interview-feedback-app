import React, { useState } from "react";
import "./App.css";
import StarRating from "./components/StarRating.tsx";
import { v4 as uuidv4 } from "uuid";

interface InterviewRecord {       // Structure of the Interview Record
  id: any;
  name: string;
  status: string;
  feedback: string;
  rating: number;
}

function App() {
  const [interviewData, setInterviewData] = useState<InterviewRecord[]>([   // Assigning the interface and initializing it using React State
    { id: uuidv4(), name: "", status: "", feedback: "", rating: 0 },
  ]);

  const addRow = (): void => {   // Adding a record when Add Record is clicked
    const newRecord: InterviewRecord = {
      id: uuidv4(),
      name: "",
      status: "",
      feedback: "",
      rating: 0,
    };
    setInterviewData([...interviewData, newRecord]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, id: number): void => {
    const updatedData = interviewData.map((record: InterviewRecord) => {  // Method for updating respective field when user enters or updates
      if (record.id === id) {
        return { ...record, [e.target.name]: e.target.value };
      }
      return record;
    });
    setInterviewData(updatedData);
  };

  const handleStarClick = (id: number, newRating: number): void => {  // Method for updating the star rating when user enters or updates
    const updatedData = interviewData.map((record) => {
      if (record.id === id) {
        return { ...record, rating: newRating };
      }
      return record;
    });
    setInterviewData(updatedData);
  };

  const removeRow = (id: number): void => {  // Method for removing a record
    const updatedData = interviewData.filter((record) => record.id !== id);
    setInterviewData(updatedData);
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
          {/* Mapping over the interviewData to display on the UI */}
          {interviewData.map((record) => (
            <tr key={record.id}>
              <td>
                {/* Input field for Name */}
                <input
                  type="text"
                  value={record.name}
                  name="name"
                  onChange={(e) => handleInputChange(e, record.id)}
                />
              </td>
              <td>
                {/* Select field for Status */}
                <select
                  value={record.status}
                  name="status"
                  onChange={(e) => handleInputChange(e, record.id)}
                >
                  <option value="pending">Pending</option>
                  <option value="complete">Complete</option>
                </select>
              </td>
              <td>
                {/* Input field for Feedback */}
                <input
                  type="text"
                  value={record.feedback}
                  name="feedback"
                  onChange={(e) => handleInputChange(e, record.id)}
                />
              </td>
              <td>
                {/* Rendering a React Component for displaying Stars for Rating */}
                <StarRating
                  rating={record.rating}
                  id={record.id}
                  onStarClick={handleStarClick}
                />
              </td>
              <td>
                {/* Button for removing a record */}
                <button onClick={() => removeRow(record.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
