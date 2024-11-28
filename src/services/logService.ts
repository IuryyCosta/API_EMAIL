import db_log from "../config/databaselog";

export const createLog = async ( email: string, message:string ): Promise<void> => {
    try {

        await db_log('logs').insert({
            email,
            message,
        });
        console.log('Log registrado com sucesso')
    } catch(error){
        console.error('Erro ao registrar log:', error);
    }
};


export const getLogs = async (): Promise<any> => {
    try {
            const logs = await db_log('logs').select('*').orderBy('created_at', 'desc');
            return logs;
        } catch(error){
            console.error('Erro ao buscar logs:', error);
            throw new Error('Erro ao busca Logs');
            }
        };