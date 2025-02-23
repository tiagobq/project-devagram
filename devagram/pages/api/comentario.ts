import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import { validarTokenJWT } from "@/middlewares/validarTokenJWT";
import { conectarMongoDB } from "@/middlewares/conectarMongoDB";
import { PublicacaoModel } from "@/models/PublicacaoModel";
import { UsuarioModel } from "@/models/UsuarioModel";
import { SeguidorModel } from "@/models/SeguidorModel";
import { politicaCORS } from "@/middlewares/politicaCORS";

const comentarioEndpoint = async (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg>) =>{
try{
    if(req.method === 'PUT'){
        const {userId, id} = req.query;
        const usuarioLogado = await UsuarioModel.findById(userId);
        if(!usuarioLogado){
            return res.status(400).json({erro : 'usuario nao encontrado'});
        }
        const publicacao = await PublicacaoModel.findById(id);
        if(!publicacao){
            return res.status(400).json({erro : 'publicacao nao encontrada'});
        }
        if(!req.body || !req.body.comentario 
            || req.body.comentario.length < 2){
                return res.status(400).json({erro: 'comentario nao e valido'});
            }
            const comentario = {
                usuarioId : usuarioLogado._id,
                nome : usuarioLogado.nome,
                comentario : req.body.comentario
            }
            publicacao.comentarios.push(comentario);
            await PublicacaoModel.findByIdAndUpdate(
                { _id: publicacao._id },
            );
            return res.status(200).json({erro : 'comentario adicionado com sucesso'});        
    }
    return res.status(405).json({erro : 'metodo informado nao e valido'});

}catch(e){
    console.log(e);
    return res.status(500).json({ erro: 'ocorreu um erro ao comentar a publicacao'});
}
};
export default politicaCORS(validarTokenJWT(conectarMongoDB(comentarioEndpoint)));