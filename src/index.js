const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../resources/swagger.json');
const authRoutes = require('./routes/authRoutes');
const cashRoutes = require('./routes/cashRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { authenticateJWT } = require('./middleware/auth');

const app = express();
app.use(express.json());

// Swagger endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Auth routes
app.use('/auth', authRoutes);
// Protected routes
app.use('/cash', authenticateJWT, cashRoutes);
app.use('/review', authenticateJWT, reviewRoutes);

app.get('/', (req, res) => {
  res.send('API Controle de Caixa - Consulte /api-docs para documentação');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
