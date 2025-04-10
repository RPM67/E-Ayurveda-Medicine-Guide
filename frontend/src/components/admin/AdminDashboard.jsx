import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListedDiseases from './ListedDiseases';
import ListedMedicines from './ListedMedicines'
import './AdminDashboard.css';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('diseases'); // Set default active section
  const navigate = useNavigate();

  const handleLogout = async () => {
    await onLogout();
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
  <div className="header-content">
    <h1>Admin Dashboard</h1>
    <p className="welcome-text">Welcome, {user?.username}!</p>
  </div>
  <div className="admin-info">
    <button onClick={handleLogout} className="logout-btn">Logout</button>
  </div>
</div>

      <div className="dashboard-options">
        <button 
          className={`option-btn ${activeSection === 'diseases' ? 'active' : ''}`}
          onClick={() => setActiveSection('diseases')}
        >
          View Listed Diseases
        </button>
        <button 
          className={`option-btn ${activeSection === 'medicines' ? 'active' : ''}`}
          onClick={() => setActiveSection('medicines')}
        >
          View Listed Medicines
        </button>
      </div>

      <div className="dashboard-content">
        {activeSection === 'diseases' && <ListedDiseases />}
        {activeSection === 'medicines' && <ListedMedicines />}
      </div>
    </div>
  );
};

export default AdminDashboard;