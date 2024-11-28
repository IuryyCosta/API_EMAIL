import { Router } from 'express';
import { handleComplexQueryAndEmail } from '../controllers/queryController';
import { fetchLogs } from '../controllers/logController';

const router = Router();

// Rota para executar a consulta complexa
router.post('/email', handleComplexQueryAndEmail);

router.get('logs', fetchLogs);

export default router;
