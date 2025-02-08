import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import { validarTokenJWT } from "@/middlewares/validarTokenJWT";
import { conectarMongoDB } from "@/middlewares/conectarMongoDB";
import { PublicacaoModel } from "@/models/PublicacaoModel";
import { UsuarioModel } from "@/models/UsuarioModel";
import { SeguidorModel } from "@/models/SeguidorModel";

const endpointSeguir = async (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg>) => {
    try{
        if(req.method === 'PUT'){

            const {userId, id} = req?.query;

            // usuario logado/autenticado = quem esta fazendo as acoes
            const usuarioLogado = await UsuarioModel.findById(userId);
            if(!req?.query?.userId){
                return res.status(400).json({erro : 'usuario logado nao encontrado'});

        }
        // id do usuario e ser seguidor - query
        const usuarioASerSeguido = await UsuarioModel.findById(id);
        if(req?.query?.id){
            return res.status(400).json({ erro : 'usuario a ser seguido nao encontrado'});
        }

        // inserir registro???
        // e se ela ja segue??

        const euJaSigoEsseUsuario = await SeguidorModel
        .find({usuarioId: usuarioLogado._id, usuarioSeguidoId : usuarioASerSeguido._id});
        if(euJaSigoEsseUsuario && euJaSigoEsseUsuario.length >0){
            // sinal que eu ja sigo esse usuario
        }else{
            // sinal que eu nao sigo esse usuario
        }
        }
        return res.status(405).json({erro: 'metodo informado nao existe'});
    }catch(e){
        console.log(e);
        return res.status(500).json({erro: 'nao foi possivel seguir/deixar de seguir o usuario informado'});
    }
}

export default validarTokenJWT(conectarMongoDB(endpointSeguir));