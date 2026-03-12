import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { addCollege, editCollege, deleteCollege, getColleges, bulkUploadPreview, bulkUploadConfirm, getEmployees, addEmployee, editEmployee, deleteEmployee, addCutoff, deleteCutoff, getConsultations, assignConsultations } from '../controllers/adminController';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware';

// Ensure uploads directory exists
const logosDir = path.join(__dirname, '../../uploads/logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// Multer for college logos
const logoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, logosDir),
  filename: (req, file, cb) => {
    const uniqueName = `college_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});
const logoUpload = multer({ storage: logoStorage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

// Multer for bulk upload (memory storage)
const bulkUpload = multer();

const router = Router();

// Protect all admin routes
router.use(authenticate, authorizeRole('ADMIN'));

router.get('/colleges', getColleges);
router.post('/college', logoUpload.single('logo'), addCollege);
router.put('/college/:id', logoUpload.single('logo'), editCollege);
router.delete('/college/:id', deleteCollege);

// Cutoff CRUD Endpoints
router.post('/cutoff', addCutoff);
router.delete('/cutoff/:id', deleteCutoff);

// Bulk Upload Endpoint
router.post('/bulk-upload-preview', bulkUpload.single('file'), bulkUploadPreview);
router.post('/bulk-upload-confirm', bulkUploadConfirm);

// Employee CRUD Endpoints
router.get('/employees', getEmployees);
router.post('/employee', addEmployee);
router.put('/employee/:id', editEmployee);
router.delete('/employee/:id', deleteEmployee);

// Consultation Endpoints
router.get('/consultations', getConsultations);
router.post('/consultations/assign', assignConsultations);

export default router;
