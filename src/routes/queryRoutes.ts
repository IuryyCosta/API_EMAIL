import { Router } from 'express';
import { handleComplexQueryAndEmail, testEmail } from '../controllers/queryController';
import { fetchLogs } from '../controllers/logController';

const router = Router();

// Rota para executar a consulta complexa
router.post('/email', handleComplexQueryAndEmail);

// rota para testar o email no mailtrap
//router.post('/email',testEmail );

router.get('logs', fetchLogs);

export default router;
