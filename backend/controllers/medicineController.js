const fs = require('fs');
const path = require('path');
const Medicine = require('../models/medicine');
const Feedback = require('../models/feedback');

exports.createMedicine = async (req, res) => {
  try {
    const { body } = req;
    body.name = body.name.trim();
    body.purchaseLinks = body.purchaseLinks.split(',').map(link => link.trim());
    body.sideEffects = body.sideEffects.split(',').map(sideEffect => sideEffect.trim());
    body.benefits = body.benefits.split(',').map(benefit => benefit.trim());

    if (req.file) {
      body.image = `/uploads/medicines/${req.file.filename}`;
    }

    // Check if medicine with trimmed name already exists
    const existingMedicine = await Medicine.findOne({ name: body.name });
    if (existingMedicine) {
      // Delete uploaded file if medicine already exists
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: 'Medicine already exists' });
    }

    const medicine = new Medicine(body);
    await medicine.save();
    res.status(201).json({message: 'Medicine added successfully'});
  } catch (error) {
    // Delete uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
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
    const medicineName = req.params.name.trim();
    const medicine = await Medicine.findOne({ name: medicineName }).populate('diseaseId', 'name');
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
    const medicine = await Medicine.findOne({ name: req.params.name.trim() });
    
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    // Delete image file if it exists
    if (medicine.image) {
      const imagePath = path.join(__dirname, '..', medicine.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete medicine from database
    await medicine.deleteOne();
    
    // Delete associated feedback
    await Feedback.deleteMany({ medicineName: medicine.name });

    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
