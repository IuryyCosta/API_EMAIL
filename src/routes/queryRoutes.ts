import { Router } from 'express';
import { handleComplexQueryAndEmail } from '../controllers/queryController';

const router = Router();

// Rota para executar a consulta complexa
router.post('/email', handleComplexQueryAndEmail);

/* router.post('/email',()=>{
    console.log('rota executada')
}); */
export default router;
