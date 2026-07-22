import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentCourse, setStudentCourse] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  async function getStudents() {
    const response = await axios.get(BASE_URL + '/students');
    setStudents(response.data);
  }

  useEffect(() => {
    getStudents();
  }, []);

  function handleId(event) {
    setStudentId(event.target.value);
  }
  function handleName(event) {
    setStudentName(event.target.value);
  }
  function handleCourse(event) {
    setStudentCourse(event.target.value);
  }

  async function sendStudentData() {
    if (isEditing === false) {
      // call post method
      const response = await axios.post(BASE_URL + '/students', {
        id: studentId,
        name: studentName,
        course: studentCourse,
      });
      alert(response.data.message);
    } else {
      // call put method
      const response = await axios.put(BASE_URL + '/students/' + studentId, {
        id: studentId,
        name: studentName,
        course: studentCourse,
      });
      alert(response.data.message);
      setIsEditing(false);
    }

    // reset form fields
    setStudentId('');
    setStudentName('');
    setStudentCourse('');

    // refresh the table
    getStudents();
  }

  function editStudentData(student) {
    setStudentId(student.id);
    setStudentName(student.name);
    setStudentCourse(student.course);
    setIsEditing(true);
  }

  async function deleteStudentData(id) {
    await axios.delete(BASE_URL + '/students/' + id);

    // alert(response.data.message)
    getStudents();
  }

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <form className="student-form">
        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={handleId}
        />
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={handleName}
        />
        <input
          type="text"
          placeholder="Student Course"
          value={studentCourse}
          onChange={handleCourse}
        />
        <button type="button" onClick={() => sendStudentData()}>
          {isEditing ? 'Update' : 'Submit'}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Student Course</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            return (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      editStudentData(student);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteStudentData(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
