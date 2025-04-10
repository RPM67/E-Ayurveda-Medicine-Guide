import { useState, useEffect } from 'react';
import axios from 'axios';
import './ListedDiseases.css';

const ListedDiseases = () => {
  const [diseases, setDiseases] = useState([]);
  const [error, setError] = useState('');
  const [editingDisease, setEditingDisease] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    symptoms: ''
  });

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/diseases');
      setDiseases(response.data);
    } catch (error) {
      setError('Failed to fetch diseases');
    }
  };

  const handleEdit = (disease) => {
    setEditingDisease(disease);
    setFormData({
      name: disease.name,
      description: disease.description,
      symptoms: disease.symptoms.join(', ')
    });
    setIsAdding(false);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/diseases/${editingDisease.name}`, formData);
      setEditingDisease(null);
      fetchDiseases();
      setFormData({ name: '', description: '', symptoms: '' });
    } catch (error) {
      setError('Failed to update disease');
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:5000/api/diseases/add', formData);
      setIsAdding(false);
      setFormData({ name: '', description: '', symptoms: '' });
      fetchDiseases();
    } catch (error) {
      setError('Failed to add disease');
    }
  };

  const handleCancel = () => {
    setEditingDisease(null);
    setIsAdding(false);
    setFormData({ name: '', description: '', symptoms: '' });
  };

  const handleDelete = async (name) => {
    if (window.confirm('Are you sure you want to delete this disease?')) {
      try {
        await axios.delete(`http://localhost:5000/api/diseases/${name}`);
        fetchDiseases();
      } catch (error) {
        setError('Failed to delete disease');
      }
    }
  };

  return (
    <div className="listed-diseases">
      
<div className="add-disease-section">
  <button 
    className="add-btn"
    onClick={() => setIsAdding(true)}
  >
    Add New Disease
  </button>
</div>

<div className="list-header">
  <h2>Listed Diseases ({diseases.length})</h2>
</div>

      {error && <div className="error-message">{error}</div>}
      
      {(isAdding || editingDisease) && (
        <div className="edit-form">
          <h3>{isAdding ? 'Add New Disease' : 'Edit Disease'}</h3>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Disease Name"
          />
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Description"
          />
          <input
            type="text"
            value={formData.symptoms}
            onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
            placeholder="Symptoms (comma separated)"
          />
          <div className="edit-actions">
            <button 
              onClick={isAdding ? handleAdd : handleUpdate} 
              className="save-btn"
            >
              {isAdding ? 'Add Disease' : 'Save Changes'}
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className="diseases-grid">
        {diseases.map(disease => (
          <div key={disease._id} className="disease-card">
            <h3>{disease.name}</h3>
            <p className="description">
              {disease.description.length > 40 
                ? `${disease.description.substring(0, 100)}...` 
                : disease.description}
            </p>
            
            <div className="symptoms">
              <strong>Symptoms:</strong>
              <ul>
                {disease.symptoms.slice(0, 3).map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
                {disease.symptoms.length > 3 && <li>...</li>}
              </ul>
            </div>

            <div className="listed-by">
              Added by: {disease.listedBy}
            </div>

            <div className="card-actions">
              <button 
                className="edit-btn"
                onClick={() => handleEdit(disease)}
              >
                Edit
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(disease.name)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListedDiseases;