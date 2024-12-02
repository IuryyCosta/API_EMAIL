import { Router } from 'express';
import { handleQueryAndEmail, testEmail } from '../controllers/queryController';


const router = Router();

// Rota para executar a consulta complexa
router.post('/email', handleQueryAndEmail);

// rota para testar o email no mailtrap
router.post('/emailteste',testEmail );



export default router;
