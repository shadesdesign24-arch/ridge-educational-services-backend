import { Router } from 'express';
import { getEligibleColleges, bookCollege, createFollowUp, getConsultations, updateConsultationStatus } from '../controllers/employeeController';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware';
import { getColleges } from '../controllers/adminController';

const router = Router();

// Protect all employee routes
router.use(authenticate, authorizeRole('EMPLOYEE'));

router.get('/colleges', getColleges); // Same getter, read-only
router.post('/check-eligibility', getEligibleColleges);
router.post('/book', bookCollege);
router.post('/follow-up', createFollowUp);

router.get('/consultations', getConsultations);
router.put('/consultations/:id/status', updateConsultationStatus);

export default router;
