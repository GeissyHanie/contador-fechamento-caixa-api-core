exports.CashController = class CashController {
    constructor() {
        this.cashCounts = [];
    }

    countCash(req, res) {
        const { amount } = req.body;
        if (typeof amount !== 'number' || amount < 0) {
            return res.status(400).json({ message: 'Invalid cash amount' });
        }
        this.cashCounts.push(amount);
        return res.status(201).json({ message: 'Cash counted successfully', amount });
    }

    getCashCount(req, res) {
        const total = this.cashCounts.reduce((acc, curr) => acc + curr, 0);
        return res.status(200).json({ totalCashCount: total });
    }
};