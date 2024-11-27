import { Router } from 'express';
import { handleComplexQueryAndEmail } from '../controllers/queryController';

const router = Router();

// Rota para executar a consulta complexa
router.post('/send-complex-query-results', handleComplexQueryAndEmail);

export default router;
