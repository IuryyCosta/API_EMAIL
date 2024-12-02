import { Router } from 'express';
import { handleQueryAndEmail, testEmail } from '../controllers/queryController';
import { handleQueryAndEmailInternal } from '../models/sendEmail';


const router = Router();

// Rota para executar a consulta complexa
router.post('/email', handleQueryAndEmail);

// rota para testar o email no mailtrap
router.post('/emailteste',testEmail );

// teste de uma rota interna 
router.post('/emailModel',handleQueryAndEmailInternal)

export default router;
