import { Router } from 'express';
import multer from 'multer';
import { addCollege, editCollege, deleteCollege, getColleges, bulkUploadPreview, bulkUploadConfirm, getEmployees, addEmployee, editEmployee, deleteEmployee, addCutoff, deleteCutoff, getConsultations, assignConsultations } from '../controllers/adminController';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware';

const upload = multer();
const router = Router();

// Protect all admin routes
router.use(authenticate, authorizeRole('ADMIN'));

router.get('/colleges', getColleges);
router.post('/college', addCollege);
router.put('/college/:id', editCollege);
router.delete('/college/:id', deleteCollege);

// Cutoff CRUD Endpoints
router.post('/cutoff', addCutoff);
router.delete('/cutoff/:id', deleteCutoff);

// Bulk Upload Endpoint
router.post('/bulk-upload-preview', upload.single('file'), bulkUploadPreview);
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
