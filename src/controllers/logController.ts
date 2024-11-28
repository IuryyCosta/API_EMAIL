import { Request, Response } from "express";
import { getLogs } from "../services/logService";


export const fetchLogs = async(req : Request, res:Response): Promise<void>=>{
    try{
            const logs = await getLogs()
            res.status(200).json(logs)
    } catch(error){
                console.error('Erro ao buscar logs:', error);
                res.status(500).json({error: 'Erro ao buscar logs'})
    }
            
};