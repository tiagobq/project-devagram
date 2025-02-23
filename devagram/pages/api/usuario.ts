import type {NextApiRequest, NextApiResponse} from 'next';
import {validarTokenJWT} from '../../middlewares/validarTokenJWT'
import { conectarMongoDB } from "@/middlewares/conectarMongoDB"; 
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import { UsuarioModel } from "@/models/UsuarioModel";
import { upload, uploadImagemCosmic } from "@/services/uploadImagemCosmic"
import nc from 'next-connect';
import { politicaCORS } from '@/middlewares/politicaCORS';

const handler = 
    nc() 
    .use(upload.single('file')) 
    .put(async (req : any, res: NextApiResponse<RespostaPadraoMsg>) => {
        try{
            const {userId} = req?.query;
            const usuario = await UsuarioModel.findById(userId);

            // se o usuario retornou algo e pq ele existe
            // se nao retornou e pq nao existe
            if(!usuario){
                return res.status(400).json({erro: 'usuario nao encontrado'});
            }

            const {nome} = req.body;
            if(nome && nome.length > 2){
                usuario.nome = nome;
            }
            const {file} = req;
            if(file && file.originalname){
                const image = await uploadImagemCosmic(req);
                if(image && image.media && image.media.url){
                    usuario.avatar = image.media.url;
                }
            }

            //alterar os dados no DB
            await UsuarioModel
                .findByIdAndUpdate({_id : usuario._id}, usuario);

                res.status(200).json({msg : 'usuario alterado com sucesso'});

        }catch(e){
            console.log(e);
        
        return res.status(400).json({erro: 'nao foi possivel atualizar usuario' + e});
        }
    })
    .get (async (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg> | any) => {
        try{
            const {userId} = req?.query;
            const usuario = await UsuarioModel.findById(userId);
            usuario.senha = null;
            console.log('senha');
            return res.status(200).json(usuario);
    
        }catch(e){
            console.log(e);
        }
        return res.status(400).json({erro: 'Nao foi possivel obter dados do usuário'});
            
    });

    export const config = {
        api : {
            bodyParser : false
        }
    }

export default politicaCORS (validarTokenJWT(conectarMongoDB(handler)));