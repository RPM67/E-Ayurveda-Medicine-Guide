const Disease = require('../models/disease');

exports.createDisease = async (req, res) => {
  try {
    var { name, description, symptoms } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    
    // Trim name and check for existing disease
    name = name.trim();
    const existingDisease = await Disease.findOne({ name });
    if (existingDisease) {
      return res.status(400).json({ error: 'Disease already exists' });
    }

    const symptomsArray = symptoms.split(',').map(symptom => symptom.trim());
    const disease = new Disease({ 
      name, 
      description: description.trim(), 
      symptoms: symptomsArray 
    });
    
    await disease.save();
    res.status(201).json({ message: 'Disease added successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiseaseByName = async (req, res) => {
  try {
    const disease = await Disease.findOne({ name: req.params.name.trim() });
    if (!disease) return res.status(404).json({ error: 'Disease not found' });
    res.json(disease);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDisease = async (req, res) => {
  try {
    let updateData = req.body;
    if (updateData.symptoms) {
      updateData.symptoms = updateData.symptoms.split(',').map(symptom => symptom.trim());
    }
    if (updateData.name) {
      updateData.name = updateData.name.trim();
    }
    const disease = await Disease.findOneAndUpdate({ name: req.params.name.trim() }, updateData, { new: true });
    if (!disease) return res.status(404).json({ error: 'Disease not found' });
    res.json({ message: 'Disease updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDisease = async (req, res) => {
  try {
    const disease = await Disease.findOneAndDelete(req.params.name);
    if (!disease) return res.status(404).json({ error: 'Disease not found' });
    res.json({ message: 'Disease deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
