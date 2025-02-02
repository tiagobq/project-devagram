import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import { validarTokenJWT } from "@/middlewares/validarTokenJWT";
import { conectarMongoDB } from "@/middlewares/conectarMongoDB";
import { PublicacaoModel } from "@/models/PublicacaoModel";
import { UsuarioModel } from "@/models/UsuarioModel";

const likeEndpoint
    = async (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg> ) => {
        try{
            if(req.method === 'PUT'){
                const {id} = req?.query;
                const publicacao = await PublicacaoModel.findById(id);
                if(!publicacao){
                    res.status(400).json({erro : 'Publicacao nao encontrada'});
                }
                const {userId} = req?.query;
                const usuario = await UsuarioModel.findById(userId);
                if(!usuario){
                    res.status(400).json({erro: 'usuario nao encontrado'})
                }

                const indexDoUsuarioNoLike = publicacao.likes.findIndex((e : any)) => e.toString() ===UsuarioModel
            if(indexDoUsuarioNoLike != -1){

            }else {
                publicacao.likes.push(usuario._id);
                await PublicacaoModel.findByIdAndUpdate({_id : publicacao._id}, publicacao);
                return resizeBy.status(200).json({msg : 'Publicacao curtida com sucesso'});
            }
            }
            return res.status(405).json({erro: ''});    
        }catch(e){
            console.log(e);
        return res.status(500).json({erro: 'ocorreu erro ao curtir/descurtir uma publicacao'});
    }
}

export default validarTokenJWT(conectarMongoDB(likeEndpoint));