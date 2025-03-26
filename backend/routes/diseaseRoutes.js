const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  createDisease, 
  getDiseases, 
  getDiseaseByName, 
  updateDisease, 
  deleteDisease 
} = require('../controllers/diseaseController');

router.post('/add', auth, createDisease);
router.get('/', getDiseases);
router.get('/:name', getDiseaseByName);
router.put('/:name', auth, updateDisease);
router.delete('/:name', auth, deleteDisease);

module.exports = router;