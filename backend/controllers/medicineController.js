const fs = require('fs');
const path = require('path');
const Medicine = require('../models/medicine');

exports.createMedicine = async (req, res) => {
  try {
    const { body } = req;
    body.purchaseLinks = body.purchaseLinks.split(',').map(link => link.trim());
    body.sideEffects = body.sideEffects.split(',').map(sideEffect => sideEffect.trim());
    const medicine = new Medicine(body);
    await medicine.save();
    res.status(201).json({message: 'Medicine added successfully'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().populate('diseaseId', 'name');
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicineByName = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({ name: req.params.name.trim() }).populate('diseaseId', 'name');
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMedicineByName = async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndUpdate({ name: req.params.name.trim() }, req.body, { new: true });
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json({message: 'Medicine updated successfully'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMedicineByName = async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndDelete({ name: req.params.name.trim() });
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
