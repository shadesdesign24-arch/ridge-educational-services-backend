import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// PostgreSQL connection
export const sequelize = new Sequelize(process.env.PG_URI!, {
  dialect: 'postgres',
  logging: false, // Turn off console logging per query
});

export const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully.');
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error);
  }
};

// MongoDB connection
export const connectMongo = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || '';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Unable to connect to MongoDB:', error);
  }
};
