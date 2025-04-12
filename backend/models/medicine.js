const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    diseaseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease',
        required: true
    },
    benefits: [String],
    dosage: String,
    sideEffects: [String],
    purchaseLinks: [String],
    image: {
        type: String,
        default: null
    },
    readMoreLink:String,
    listedBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Medicine', medicineSchema);