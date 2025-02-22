import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import type { RespostaPadraoMsg } from '../types/RespostaPadraoMsg';
import nextCors from "next-cors";

export const politicaCORS = (handler : NextApiHandler) =>
async (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg>) => {
    try{

        await NextCors(req, res, {
            origin : '*',
            methods : ['GET', 'POST', 'PUT'],
            header: []
        });

    }catch(e){
        console.log('Erro ao tratar a politica de CORS:', e);
    }
}