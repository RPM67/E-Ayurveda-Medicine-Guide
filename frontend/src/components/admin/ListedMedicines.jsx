import { useState, useEffect } from 'react';
import axios from 'axios';
import './ListedMedicines.css';

const ListedMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [error, setError] = useState('');
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    diseaseId: '',
    benefits: '',
    dosage: '',
    sideEffects: '',
    purchaseLinks: '',
    image: null
  });

  useEffect(() => {
    fetchMedicines();
    fetchDiseases();
  }, []);

  const validateImage = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB
  
    if (!validTypes.includes(file.type)) {
      setError('Only JPG, JPEG and PNG files are allowed');
      return false;
    }
  
    if (file.size > maxSize) {
      setError('Image size should be less than 5MB');
      return false;
    }
  
    return true;
  };

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/medicines');
      setMedicines(response.data);
    } catch (error) {
      setError('Failed to fetch medicines');
    }
  };

  const fetchDiseases = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/diseases');
      setDiseases(response.data);
    } catch (error) {
      setError('Failed to fetch diseases');
    }
  };

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
    setFormData({
        name: medicine.name,
        description: medicine.description,
        diseaseId: medicine.diseaseId._id,
        benefits: medicine.benefits.join(', '),
        dosage: medicine.dosage,
        sideEffects: medicine.sideEffects.join(', '),
        purchaseLinks: medicine.purchaseLinks.join(', '),
        readMoreLink: medicine.readMoreLink || '',
        image: null
    });
    setIsAdding(false);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    // Append all form data
    formDataToSend.append('name', formData.name);
  formDataToSend.append('description', formData.description);
  formDataToSend.append('diseaseId', formData.diseaseId);
  formDataToSend.append('benefits', formData.benefits);
  formDataToSend.append('dosage', formData.dosage);
  formDataToSend.append('sideEffects', formData.sideEffects);
  formDataToSend.append('purchaseLinks', formData.purchaseLinks);
  formDataToSend.append('readMoreLink', formData.readMoreLink || '');

  if (formData.image) {
    formDataToSend.append('image', formData.image);
  }

  try {
    if (isAdding) {
      await axios.post('http://localhost:5000/api/medicines/add', formDataToSend);
    } else {
      await axios.put(`http://localhost:5000/api/medicines/${editingMedicine.name}`, formDataToSend);
    }
    
    // Reset form
    setEditingMedicine(null);
    setIsAdding(false);
    setFormData({
      name: '',
      description: '',
      diseaseId: '',
      benefits: '',
      dosage: '',
      sideEffects: '',
      purchaseLinks: '',
      readMoreLink: '',
      image: null
    });
    
    // Refresh medicines list
    fetchMedicines();
  } catch (error) {
    setError(`Failed to ${isAdding ? 'add' : 'update'} medicine: ${error.response?.data?.error || error.message}`);
  }
};

  const handleCancel = () => {
    setEditingMedicine(null);
    setIsAdding(false);
    setFormData({
      name: '',
      description: '',
      diseaseId: '',
      benefits: '',
      dosage: '',
      sideEffects: '',
      purchaseLinks: '',
      image: null
    });
  };

  const handleDelete = async (name) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await axios.delete(`http://localhost:5000/api/medicines/${name}`);
        fetchMedicines();
      } catch (error) {
        setError('Failed to delete medicine');
      }
    }
  };

  return (
    <div className="listed-medicines">
      <div className="add-medicine-section">
        <button 
          className="add-btn"
          onClick={() => setIsAdding(true)}
        >
          Add New Medicine
        </button>
      </div>

      <div className="list-header">
        <h2>Listed Medicines ({medicines.length})</h2>
      </div>

      {error && <div className="error-message">{error}</div>}
      
      {(isAdding || editingMedicine) && (
        <div className="edit-form">
          <h3>{isAdding ? 'Add New Medicine' : 'Edit Medicine'}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Medicine Name"
            />
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Description"
            />
            <select
              value={formData.diseaseId}
              onChange={(e) => setFormData({...formData, diseaseId: e.target.value})}
              required
            >
              <option value="">Select Disease</option>
              {diseases.map(disease => (
                <option key={disease._id} value={disease._id}>
                  {disease.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={formData.benefits}
              onChange={(e) => setFormData({...formData, benefits: e.target.value})}
              placeholder="Benefits (comma separated)"
            />
            <input
              type="text"
              value={formData.dosage}
              onChange={(e) => setFormData({...formData, dosage: e.target.value})}
              placeholder="Dosage"
            />
            <input
              type="text"
              value={formData.sideEffects}
              onChange={(e) => setFormData({...formData, sideEffects: e.target.value})}
              placeholder="Side Effects (comma separated)"
            />
            <input
              type="text"
              value={formData.purchaseLinks}
              onChange={(e) => setFormData({...formData, purchaseLinks: e.target.value})}
              placeholder="Purchase Links (comma separated)"
            />
            <input
  type="file"
  accept="image/png, image/jpeg, image/jpg"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file && validateImage(file)) {
      setFormData({...formData, image: file});
      setError('');
    } else {
      e.target.value = '';
    }
  }}
/>

<div className="reference-section">
    <h4>Scientific Validation</h4>
    <input
      type="url"
      value={formData.readMoreLink || ''}
      onChange={(e) => setFormData({...formData, readMoreLink: e.target.value})}
      placeholder="Add a reference link (e.g., research paper, journal article)"
      className="reference-input"
    />
  </div>

            <div className="edit-actions">
              <button type="submit" className="save-btn">
                {isAdding ? 'Add Medicine' : 'Save Changes'}
              </button>
              <button type="button" onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="medicines-grid">
        {medicines.map(medicine => (
          <div key={medicine._id} className="medicine-card">
            {medicine.image && (
              <img 
                src={`http://localhost:5000${medicine.image}`} 
                alt={medicine.name}
                className="medicine-image"
              />
            )}
            <h3>{medicine.name}</h3>
            <p className="description">
              {medicine.description.length > 100 
                ? `${medicine.description.substring(0, 100)}...` 
                : medicine.description}
            </p>
            
            <div className="disease-name">
              <strong>Disease:</strong> {medicine.diseaseId?.name}
            </div>

            <div className="listed-by">
              Added by: {medicine.listedBy}
            </div>

            <div className="card-actions">
              <button 
                className="edit-btn"
                onClick={() => handleEdit(medicine)}
              >
                Edit
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(medicine.name)}
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

export default ListedMedicines;