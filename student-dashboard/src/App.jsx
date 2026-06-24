import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Student Profile Dashboard</h1>

      <div className="profiles">

        {/* Student 1 */}
        <div className="card">
          <img
            src="https://images.pexels.com/photos/37811260/pexels-photo-37811260.jpeg"
            alt="Student 1"
            className="profile-pic"
          />

          <p><strong>Name:</strong> Rahul Sharma </p>
          <p><strong>Course:</strong> B.Tech CSE</p>
          <p><strong>Year:</strong> 3rd Year</p>
          <p><strong>CGPA:</strong> 8.5</p>
        </div>

        {/* Student 2 */}
        <div className="card">
          <img
            src="https://images.pexels.com/photos/3775128/pexels-photo-3775128.jpeg"
            alt="Student 2"
            className="profile-pic"
          />

          <p><strong>Name:</strong> Priya Singh </p>
          <p><strong>Course:</strong> BCA</p>
          <p><strong>Year:</strong> 2nd Year</p>
          <p><strong>CGPA:</strong> 8.4</p>
        </div>

      </div>
    </div>
  );
}

export default App;