const { denominations, cashCounts } = require('../models/db');

const getReview = (req, res) => {
  const username = req.user.username;
  const userCounts = cashCounts[username] || {};
  let total = 0;
  const review = denominations.map(type => {
    const value = parseFloat(type.replace('R$', '').replace(',', '.'));
    const quantity = userCounts[type] || 0;
    const partial = value * quantity;
    total += partial;
    return { type, quantity, partial };
  });
  res.json({ review, total });
};

const updateDenomination = (req, res) => {
  const { type, quantity } = req.body;
  if (!denominations.includes(type) || typeof quantity !== 'number' || quantity < 0) {
    return res.status(400).json({ message: 'Denominação ou quantidade inválida' });
  }
  const username = req.user.username;
  if (!cashCounts[username]) cashCounts[username] = {};
  cashCounts[username][type] = quantity;
  res.status(200).json({ message: 'Quantidade atualizada', type, quantity });
};

const getFinalResult = (req, res) => {
  const username = req.user.username;
  const userCounts = cashCounts[username] || {};
  let total = 0;
  denominations.forEach(type => {
    const value = parseFloat(type.replace('R$', '').replace(',', '.'));
    const quantity = userCounts[type] || 0;
    total += value * quantity;
  });
  res.json({ total });
};

module.exports = { getReview, updateDenomination, getFinalResult };
