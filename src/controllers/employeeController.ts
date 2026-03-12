import { Request, Response } from 'express';
import { College } from '../models/pg/College';
import { CutoffMarks } from '../models/pg/CutoffMarks';
import { Booking } from '../models/pg/Booking';
import { FollowUp } from '../models/mongo/FollowUp';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { Op } from 'sequelize';

export const getEligibleColleges = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseName, category, studentCutoffMarks } = req.body;

    if (!courseName || !category || studentCutoffMarks === undefined) {
      res.status(400).json({ message: 'courseName, category, and studentCutoffMarks are required' });
      return;
    }

    const marks = parseFloat(studentCutoffMarks);

    // Find all cutoff marks where student's marks >= minimumCutoff, matching course & category
    const cutoffs = await CutoffMarks.findAll({
      where: {
        courseName,
        category,
        minimumCutoff: {
          [Op.lte]: marks,
        },
      },
      include: [
        {
          model: College,
          as: 'college',
        },
      ],
    });

    const eligibleColleges = cutoffs.map(cutoff => ({
      cutoffDetails: cutoff,
      college: cutoff.college,
    }));

    res.status(200).json({ eligibleColleges });
  } catch (error) {
    res.status(500).json({ message: 'Error checking eligibility', error });
  }
};

export const bookCollege = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { collegeId, studentName, studentEmail } = req.body;
    const employeeId = req.user?.id;

    if (!employeeId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const booking = await Booking.create({
      employeeId,
      collegeId,
      studentName,
      studentEmail,
    });

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error booking college', error });
  }
};

export const createFollowUp = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const employeeId = req.user?.id;
    const { studentName, studentPhone, notes, status } = req.body;

    if (!employeeId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const followUp = new FollowUp({
      employeeId,
      studentName,
      studentPhone,
      notes,
      status: status || 'WARM',
    });

    await followUp.save();

    res.status(201).json({ message: 'Follow-up created', followUp });
  } catch (error) {
    res.status(500).json({ message: 'Error saving follow-up', error });
  }
};

import { Consultation } from '../models/pg/Consultation';

export const getConsultations = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const employeeId = req.user?.id;
    if (!employeeId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const consultations = await Consultation.findAll({
      where: { assignedEmployeeId: employeeId },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(consultations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching consultations', error });
  }
};

export const updateConsultationStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const employeeId = req.user?.id;
    const { id } = req.params;
    const { status } = req.body;

    if (!employeeId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const consultation = await Consultation.findOne({ where: { id, assignedEmployeeId: employeeId } });
    if (!consultation) {
      res.status(404).json({ message: 'Consultation not found or not assigned to you' });
      return;
    }

    consultation.status = status;
    await consultation.save();

    res.status(200).json({ message: 'Status updated successfully', consultation });
  } catch (error) {
    res.status(500).json({ message: 'Error updating consultation status', error });
  }
};
