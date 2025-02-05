import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import { validarTokenJWT } from "@/middlewares/validarTokenJWT";
import { conectarMongoDB } from "@/middlewares/conectarMongoDB";
import { PublicacaoModel } from "@/models/PublicacaoModel";
import { UsuarioModel } from "@/models/UsuarioModel";

const endpointSeguir = (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg>) => {
    try{

    }catch(e){
        console.log(e);
        return res.status(500).json({erro: 'nao foi possivel seguir/deixar de seguir o usuario informado'});
    }
}

export default validarTokenJWT(conectarMongoDB());