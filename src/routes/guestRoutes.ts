import { Router } from 'express';
import { Consultation } from '../models/pg/Consultation';
import { sendEmail } from '../utils/sendEmail';

const router = Router();

router.post('/consultation', async (req, res) => {
  try {
    const { name, email, phone, interest, type } = req.body;
    
    // Save to database
    const newConsultation = await Consultation.create({
      name,
      email,
      phone,
      interest,
      type,
    });

    // Send email alert (non-blocking)
    try {
      const subject = `New ${type} Consultation Request: ${name}`;
      const html = `
        <h3>New Consultation Request</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Interest:</strong> ${interest}</li>
          <li><strong>Type:</strong> ${type} Consultation</li>
        </ul>
      `;
      await sendEmail(subject, html);
    } catch (emailError) {
      console.error('Failed to send consultation email:', emailError);
      // We don't throw here, so the DB record is still acknowledged as successful to the user.
    }

    res.status(201).json({ message: 'Consultation request submitted successfully' });
  } catch (error) {
    console.error('Error creating consultation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
