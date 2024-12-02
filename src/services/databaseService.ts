import db from '../config/database';

export const executeQuery = async (): Promise<string> => {
  const query = `
            SELECT 
        COUNT(tasy.nr_atendimento) AS legado,
        COUNT(api.nr_atendimento) AS api,
        COUNT(tasy.nr_atendimento) - COUNT(api.nr_atendimento) AS diferenca
    FROM (
        SELECT DISTINCT 
            ap.nr_atendimento
        FROM 
            tasy.atendimento_paciente_v ap
        LEFT JOIN tasy.sus_laudo_paciente a  ON a.nr_atendimento = ap.nr_atendimento
        WHERE 
            a.dt_cancelamento IS NULL
        AND ap.ie_tipo_atendimento = 1
        AND ap.cd_convenio = 4
        AND TRUNC(ap.dt_alta) BETWEEN TO_DATE('19/11/2024', 'DD/MM/YYYY') 
                                  AND TO_DATE('20/11/2024', 'DD/MM/YYYY')
    ) tasy left join (
     
                SELECT DISTINCT nr_atendimento
                FROM tbl_inm_atendimento
                WHERE tp_status <> 'A'
                 AND nr_atendimento IN (
                                            SELECT DISTINCT ap.nr_atendimento
                                            FROM tasy.atendimento_paciente_v ap
                                            LEFT JOIN tasy.sus_laudo_paciente a
                                            ON a.nr_atendimento = ap.nr_atendimento
                                            WHERE a.dt_cancelamento IS NULL
                                            AND ap.ie_tipo_atendimento = 1
                                            AND ap.cd_convenio = 4
                                            AND TRUNC(ap.dt_alta) BETWEEN TO_DATE('19/11/2024', 'DD/MM/YYYY') 
                                                                    AND TO_DATE('20/11/2024', 'DD/MM/YYYY')
                                        )
    
    ) api ON tasy.nr_atendimento = api.nr_atendimento
  `;

  try {

    const queryResult = await db.raw(query);
    
    const result = queryResult[0];

    const {LEGADO,API,DIFERENCA} = result;

    const formattedResult = `Resultado do relatório: Legado = ${LEGADO}, API = ${API}, Diferença = ${DIFERENCA}`;


   return formattedResult; 

  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    throw new Error('Erro ao executar consulta');
  }
};
