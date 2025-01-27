import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import { conectarMongoDB } from "@/middlewares/conectarMongoDB";
import { validarTokenJWT } from "@/middlewares/validarTokenJWT";

const pesquisaEndpoint 
    = (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg>) => {
        try{
            if(req.method === 'GET'){

            }
            return res.status(405).json({erro : 'Metodo informado nao e valido'});
        }catch(e){
            console.log(e);
            return res.status(500).json({erro : ' Nao foi possivel buscar usuarios:' + e});
        }
    }
    
    export default validarTokenJWT(conectarMongoDB(pesquisaEndpoint));