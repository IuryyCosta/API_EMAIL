import db from '../config/database';

export const executeComplexQuery = async (): Promise<any[]> => {
  const query = `
    SELECT 
        COUNT(tasy.nr_atendimento) AS legado,
        COUNT(api.nr_atendimento) AS api,
        COUNT(tasy.nr_atendimento) - COUNT(api.nr_atendimento) AS diferenca
    FROM (
        -- Total de atendimentos de alta por período no Tasy
        SELECT DISTINCT 
            ap.nr_atendimento
        FROM
            tasy.atendimento_paciente_v ap,
            tasy.sus_laudo_paciente a
        WHERE
            a.dt_cancelamento IS NULL
            AND ie_tipo_atendimento = 1
            AND cd_convenio = 4
            AND a.nr_atendimento (+) = ap.nr_atendimento
            AND TRUNC(dt_alta) BETWEEN TO_DATE('19/11/2024', 'DD/MM/YYYY') AND TO_DATE('20/11/2024', 'DD/MM/YYYY')
            AND dt_alta >= TO_DATE('19/11/2024 06:00:00', 'DD/MM/YYYY HH24:MI:SS')
            AND dt_alta <= TO_DATE('19/11/2024 18:00:00', 'DD/MM/YYYY HH24:MI:SS')
    ) tasy
    LEFT JOIN (
        -- Total de atendimentos na tabela tbl_inm_atendimento
        SELECT DISTINCT 
            nr_atendimento
        FROM 
            tbl_inm_atendimento
        WHERE 
            tp_status <> 'A'
            AND nr_atendimento IN (
                SELECT DISTINCT 
                    ap.nr_atendimento
                FROM
                    tasy.atendimento_paciente_v ap,
                    tasy.sus_laudo_paciente a
                WHERE
                    a.dt_cancelamento IS NULL
                    AND ie_tipo_atendimento = 1
                    AND cd_convenio = 4
                    AND a.nr_atendimento (+) = ap.nr_atendimento
                    AND TRUNC(dt_alta) BETWEEN TO_DATE('19/11/2024', 'DD/MM/YYYY') AND TO_DATE('20/11/2024', 'DD/MM/YYYY')
                    AND dt_alta >= TO_DATE('19/11/2024 06:00:00', 'DD/MM/YYYY HH24:MI:SS')
                    AND dt_alta <= TO_DATE('19/11/2024 18:00:00', 'DD/MM/YYYY HH24:MI:SS')
            )
    ) api 
    ON 
        tasy.nr_atendimento = api.nr_atendimento;
  `;

  try {
    const results = await db.raw(query);
    return results; // Retorna os resultados da consulta
  } catch (error) {
    console.error('Erro ao executar consulta complexa:', error);
    throw new Error('Erro ao executar consulta complexa');
  }
};
