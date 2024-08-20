import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Alert System</h2>
      <div>
        <Link to="/login" className="btn btn-primary">User Login</Link>
      </div>
      <div>
        <Link to="/adminsignin" className="btn btn-secondary">Admin Sign-In</Link>
      </div>
    </div>
  );
}

export default Home;
