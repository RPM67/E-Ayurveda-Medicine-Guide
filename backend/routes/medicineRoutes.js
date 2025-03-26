const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  createMedicine, 
  getMedicines, 
  getMedicineByName,
  updateMedicineByName,
  deleteMedicineByName 
} = require('../controllers/medicineController');

router.post('/add', auth, (req, res) => {
  createMedicine(req, res);
});
router.get('/', getMedicines);
router.get('/:name', getMedicineByName); 
router.put('/:name', auth, updateMedicineByName); 
router.delete('/:name', auth, deleteMedicineByName);

module.exports = router;
