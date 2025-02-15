import type { NextApiResponse } from "next"; // Request, Response e Handler padrão do Next
import { validarTokenJWT } from "@/middlewares/validarTokenJWT"; // Importando o middleware de validação do token JWT criado
import { conectarMongoDB } from "@/middlewares/conectarMongoDB"; // Importando o middleware de conexão com DB que foi criado
import type { RespostaPadraoMsg } from "@/types/RespostaPadraoMsg"; // Importando o tipo de resposta padrão que criamos
import { upload, uploadImagemCosmic } from "@/services/uploadImagemCosmic";
import nc from 'next-connect';
import {PublicacaoModel} from '../../models/PublicacaoModel';
import {UsuarioModel} from '../../models/UsuarioModel';
import md5 from 'md5';

const handler = 
    nc() 
    .use(upload.single("file")) 
    .post(async (req : any, res: NextApiResponse<RespostaPadraoMsg> | any) => {
        
        try{ 
            const {userId} = req.query;
            const usuario = await UsuarioModel.findById(userId);
            if(!usuario){
                return res.status(400).json({erro: 'Usuario nao encontrado'});
            }
            if(!req || !req.body){
                return res.status(400).json({erro: 'Parametros de entrada não informados'});
            }
            const {descricao} = req?.body;

        if(!descricao || descricao.length < 2){
            return res.status(400).json({erro: 'Descricao nao e valida'});
        }

        if(!req.file || !req.file.originalname){
            return res.status(400).json({erro: 'Imagem e obrigatoria'});
        }

        const image = await uploadImagemCosmic(req);
        const publicacao = {
            idUsuario : usuario._id,
            descricao,
            foto : image.media.url,
            data : new Date()
        }

        usuario.publicacoes++;
        await UsuarioModel.findByIdAndUpdate({_id : usuario._id}, usuario)

        await PublicacaoModel.create(publicacao);

        return res.status(200).json({msg: 'Publicacao criada com sucesso'});
    }catch (e) {
        console.log(e);
            return res.status(400).json({erro: 'Erro ao cadastrar publicação'});
        }
    });

    export const config = {  // Passa uma configuração para o NEXT não transformar a resposta em JSON e enviar a request como FormData devido a estarmos passando um arquivo
        api : {
            bodyParser : false
        }
    };

    export default validarTokenJWT(conectarMongoDB(handler));