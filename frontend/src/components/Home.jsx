import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import MedicineCard from './MedicineCard';
import './Home.css';

const Home = () => {
  const [diseases, setDiseases] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/diseases');
      const options = response.data.map(disease => ({
        value: disease._id,
        label: disease.name
      }));
      setDiseases(options);
    } catch (error) {
      console.error('Error fetching diseases:', error);
    }
  };

  useEffect(() => {
    const fetchMedicines = async () => {
      if (!selectedDisease) {
        setMedicines([]);
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/medicines');
        const filteredMedicines = response.data.filter(
          medicine => medicine.diseaseId && medicine.diseaseId._id === selectedDisease.value
        );
        setMedicines(filteredMedicines);
      } catch (error) {
        console.error('Error fetching medicines:', error);
        setMedicines([]);
      }
    };
    fetchMedicines();
  }, [selectedDisease]);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>E-Ayurveda Medicine Guide</h1>
        <p className="subtitle">Discover traditional Ayurvedic remedies for your health concerns</p>
        
        <div className="search-container">
          <Select
            options={diseases}
            value={selectedDisease}
            onChange={setSelectedDisease}
            placeholder="Search for a disease or condition..."
            className="disease-select"
            classNamePrefix="select"
          />
        </div>
      </div>

      {!selectedDisease && (
        <div className="welcome-section">
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Natural Remedies</h3>
              <p>Explore traditional Ayurvedic medicines backed by centuries of wisdom</p>
            </div>
            <div className="feature-card">
              <h3>Expert Guidance</h3>
              <p>Detailed information about dosage, benefits, and proper usage</p>
            </div>
            <div className="feature-card">
              <h3>Verified Sources</h3>
              <p>All medicines listed with authentic purchase sources</p>
            </div>
            <div className="feature-card">
              <h3>User Reviews</h3>
              <p>Real feedback from users who tried the medicines</p>
            </div>
          </div>
        </div>
      )}

      {selectedDisease && (
        <div className="results-section">
          <h2>Recommended Medicines for {selectedDisease.label}</h2>
          <div className="medicines-grid">
            {medicines.length > 0 ? (
              medicines.map(medicine => (
                <MedicineCard key={medicine._id} medicine={medicine} />
              ))
            ) : (
              <div className="no-results">
                <p>No medicines found for this condition.</p>
                <p>Please try selecting a different disease.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;