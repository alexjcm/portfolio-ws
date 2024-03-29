import { Router } from 'express';
import { emailBodyValidation } from '../middlewares/emailBodyValidation';
import * as mailerController from '../controllers/mailer';

const router = Router();

router.post('/mailer/sendMail', emailBodyValidation, mailerController.sendEmail);
router.get('/mailer/test', mailerController.testSTMPConection);

router.get('/sentry/testSentry', mailerController.testSentry);

export default router;
