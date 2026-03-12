import { Request, Response } from 'express';
import { College } from '../models/pg/College';
import { CutoffMarks } from '../models/pg/CutoffMarks';
import { User } from '../models/pg/User';
import xlsx from 'xlsx';
import bcrypt from 'bcryptjs';

export const addCollege = async (req: Request, res: Response): Promise<void> => {
  try {
    // When using multer with form-data, JSON fields come as strings
    const { name, location, description, website, admissionFee, healthCardFee, applicationFee } = req.body;
    const cutoffs = req.body.cutoffs ? JSON.parse(req.body.cutoffs) : [];
    const yearWiseFees = req.body.yearWiseFees ? JSON.parse(req.body.yearWiseFees) : [];
    const logo = (req as any).file ? `/uploads/logos/${(req as any).file.filename}` : null;

    const college = await College.create({
      name, location, description, website, logo,
      yearWiseFees, admissionFee, healthCardFee, applicationFee
    });

    // If cutoffs array is provided, create them all
    if (cutoffs && Array.isArray(cutoffs) && cutoffs.length > 0) {
      for (const c of cutoffs) {
        if (c.courseName && c.category && c.minimumCutoff !== undefined) {
          await CutoffMarks.create({
            collegeId: college.id,
            courseName: c.courseName,
            category: c.category,
            minimumCutoff: parseFloat(c.minimumCutoff),
          });
        }
      }
    }

    // Re-fetch with cutoffs included
    const result = await College.findByPk(college.id, { include: [{ model: CutoffMarks, as: 'cutoffs' }] });
    res.status(201).json({ message: 'College added', college: result });
  } catch (error) {
    res.status(500).json({ message: 'Error adding college', error });
  }
};

export const editCollege = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, location, description, website, admissionFee, healthCardFee, applicationFee } = req.body;
    const yearWiseFees = req.body.yearWiseFees ? JSON.parse(req.body.yearWiseFees) : undefined;
    const logo = (req as any).file ? `/uploads/logos/${(req as any).file.filename}` : undefined;

    const updateData: any = { name, location, description, website, admissionFee, healthCardFee, applicationFee };
    if (yearWiseFees !== undefined) updateData.yearWiseFees = yearWiseFees;
    if (logo) updateData.logo = logo;

    await College.update(updateData, { where: { id } });
    const updated = await College.findByPk(Number(id), { include: [{ model: CutoffMarks, as: 'cutoffs' }] });
    res.status(200).json({ message: 'College updated', college: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating college', error });
  }
};

export const deleteCollege = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await CutoffMarks.destroy({ where: { collegeId: id } });
    await College.destroy({ where: { id } });
    res.status(200).json({ message: 'College deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting college', error });
  }
};

export const addCutoff = async (req: Request, res: Response): Promise<void> => {
  try {
    const { collegeId, courseName, category, minimumCutoff } = req.body;
    const cutoff = await CutoffMarks.create({ collegeId, courseName, category, minimumCutoff: parseFloat(minimumCutoff) });
    res.status(201).json({ message: 'Cutoff added', cutoff });
  } catch (error) {
    res.status(500).json({ message: 'Error adding cutoff', error });
  }
};

export const deleteCutoff = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await CutoffMarks.destroy({ where: { id } });
    res.status(200).json({ message: 'Cutoff deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cutoff', error });
  }
};

export const getColleges = async (req: Request, res: Response): Promise<void> => {
  try {
    const colleges = await College.findAll({ include: [{ model: CutoffMarks, as: 'cutoffs' }], order: [['createdAt', 'DESC']] });
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching colleges', error });
  }
};

export const bulkUploadPreview = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    
    // Return to frontend for review
    res.status(200).json({ previewData: data });
  } catch (error) {
    res.status(500).json({ message: 'Error processing excel file', error });
  }
};

export const bulkUploadConfirm = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data } = req.body; // Array of validated objects from frontend
    // Example format expected from frontend: [{name, location, course, category, cutoff}, ...]
    
    let createdCount = 0;
    
    for (const row of data) {
      if (!row.name || !row.location) continue;
      
      let college = await College.findOne({ where: { name: row.name } });
      if (!college) {
        college = await College.create({
          name: row.name,
          location: row.location,
          description: row.description || '',
          website: row.website || ''
        });
        createdCount++;
      }
      
      if (row.course && row.category && row.cutoff) {
        await CutoffMarks.create({
          collegeId: college.id,
          courseName: row.course,
          category: row.category,
          minimumCutoff: parseFloat(row.cutoff)
        });
      }
    }

    res.status(200).json({ message: `Bulk processed. Added/Checked colleges and cutoffs.`, newColleges: createdCount });
  } catch (error) {
    res.status(500).json({ message: 'Error confirming bulk upload', error });
  }
};

export const getEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await User.findAll({ where: { role: 'EMPLOYEE' } });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
};

export const addEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = await User.create({ email, password: hashedPassword, role: 'EMPLOYEE' });
    res.status(201).json({ message: 'Employee added successfully', employee: { id: newEmployee.id, email: newEmployee.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error adding employee', error });
  }
};

export const editEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const updates: any = { email };
    
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }
    
    await User.update(updates, { where: { id, role: 'EMPLOYEE' } });
    const updated = await User.findByPk(Number(id));
    res.status(200).json({ message: 'Employee updated', employee: { id: updated?.id, email: updated?.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
};

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id, role: 'EMPLOYEE' } });
    res.status(200).json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
};

import { Consultation } from '../models/pg/Consultation';

export const getConsultations = async (req: Request, res: Response): Promise<void> => {
  try {
    const consultations = await Consultation.findAll({
      include: [{ model: User, as: 'employee', attributes: ['id', 'email'] }],
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(consultations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching consultations', error });
  }
};

export const assignConsultations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { consultationIds, employeeId } = req.body;
    
    if (!employeeId || !consultationIds || !Array.isArray(consultationIds)) {
      res.status(400).json({ message: 'Invalid data' });
      return;
    }

    await Consultation.update(
      { assignedEmployeeId: employeeId, status: 'Assigned' },
      { where: { id: consultationIds } }
    );

    res.status(200).json({ message: 'Leads assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning consultations', error });
  }
};


