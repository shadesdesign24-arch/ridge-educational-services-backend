import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectPostgres, connectMongo, sequelize } from './config/db';

import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import employeeRoutes from './routes/employeeRoutes';
import guestRoutes from './routes/guestRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve uploaded files (college logos)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Init DBs
connectPostgres().then(() => {
  sequelize.sync({ alter: true }).then(() => {
    console.log('Postgres models synced.');
  }).catch((err) => {
    console.error('Error syncing Postgres models', err);
  });
});

connectMongo();

// Routes
app.use('/ridge-backend', guestRoutes);
app.use('/ridge-backend/auth', authRoutes);
app.use('/ridge-backend/admin', adminRoutes);
app.use('/ridge-backend/employee', employeeRoutes);

app.get('/', (req, res) => {
  res.send('Ridge Educational API Server Subsystem Running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
