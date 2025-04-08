const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { 
  createMedicine, 
  getMedicines, 
  getMedicineByName,
  updateMedicineByName,
  deleteMedicineByName 
} = require('../controllers/medicineController');

router.post('/add', auth, upload.single('image'), (req, res) => {
  createMedicine(req, res);
});
router.get('/', getMedicines);
router.get('/:name', getMedicineByName); 
router.put('/:name', auth, updateMedicineByName); 
router.delete('/:name', auth, deleteMedicineByName);

module.exports = router;
