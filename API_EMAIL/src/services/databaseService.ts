import db from '../config/database';

export const executeQuery = async (): Promise<string> => {
  const query =`
  SELECT COUNT(*) LEGADO
  FROM atendimento_paciente
  WHERE TRUNC(dt_alta) = TO_DATE('02/11/2024', 'DD/MM/YYYY')
`;

  try {

    const queryResult = await db.raw(query);
    console.log(query)
    
    const result = queryResult[0];

    const {LEGADO,API,DIFERENCA} = result;

    const formattedResult = 
    `Resultado do relatório:\n Legado = ${LEGADO},\n API = ${API},\n Diferença = ${DIFERENCA}`;
    
    

   return formattedResult
            ; 

  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    throw new Error('Erro ao executar consulta');
  }
};
