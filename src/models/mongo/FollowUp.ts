import mongoose, { Schema, Document } from 'mongoose';

export interface IFollowUp extends Document {
  employeeId: number; // Storing the Postgres User ID
  studentName: string;
  studentPhone: string;
  notes: string;
  status: 'HOT' | 'WARM' | 'COLD' | 'CLOSED';
  createdAt: Date;
  updatedAt: Date;
}

const FollowUpSchema: Schema = new Schema(
  {
    employeeId: { type: Number, required: true },
    studentName: { type: String, required: true },
    studentPhone: { type: String, required: false },
    notes: { type: String, required: false },
    status: { 
      type: String, 
      enum: ['HOT', 'WARM', 'COLD', 'CLOSED'], 
      default: 'WARM' 
    },
  },
  { timestamps: true }
);

export const FollowUp = mongoose.model<IFollowUp>('FollowUp', FollowUpSchema);
