import db from '../config/database';

export const executeQuery = async (): Promise<string> => {
  const query =`
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
        AND TRUNC(dt_alta) = TRUNC(SYSDATE - 1) -- Alteração para pegar o dia anterior
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
                AND TRUNC(dt_alta) = TRUNC(SYSDATE - 1) -- Alteração para pegar o dia anterior
        )
) api
ON 
    tasy.nr_atendimento = api.nr_atendimento
`;

  try {

    const queryResult = await db.raw(query);
    //console.log(query)
    
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


export const querySucessErro = async (): Promise<String> =>{

  const query = `
  
        select 
            1 Sucesso,
            2 Erro
        from 
          dual 
  
  `

  try{
    const queryResult = await db.raw(query);
    const result = queryResult[0];

    const {Sucesso, Erro} = result

    const resultFormat =` Quatitativo Sucesso x Erro \n\nSucesso : Sem dados ainda Erros : Sem dados ainda ` ;

    return resultFormat

  }catch(errorSucessErro){
    console.error('Erro ao executar consulta QuerySucessErro:', errorSucessErro);
    throw new Error('Erro ao executar consulta');
  }


}


export const queryErros = async () : Promise<String>=>{
  const query = `
  
    SELECT DISTINCT 
    COUNT(DS_ERRO) DS_ERRO_COUNT,
    DS_ERRO 

    FROM TBL_INM_ATENDIMENTO 

    WHERE 
       TRUNC(DT_PROCESSADO) = TRUNC(SYSDATE - 1)
      AND DS_ERRO <> 'NULL'
      GROUP BY DS_ERRO 
  
  
  `
    try{
        const queryResult = await db.raw(query);
        const result = queryResult[0];

        const {DS_ERRO, DS_ERRO_COUNT} = result

        const formaResult = `Lista de erros \nCount dos erros :\n ${DS_ERRO_COUNT} Erros : ${DS_ERRO}` ;

      return formaResult 
    }catch(erroQueryErro){
      console.error('Erro ao executar consulta QuerySucessErro:', erroQueryErro);
    throw new Error('Erro ao executar consulta');
    }

}