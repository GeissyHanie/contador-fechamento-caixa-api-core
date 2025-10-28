const mongoose = require('mongoose');

const cashCountSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    countedAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    notes: {
        type: String,
        default: ''
    }
});

const CashCount = mongoose.model('CashCount', cashCountSchema);

module.exports = CashCount;