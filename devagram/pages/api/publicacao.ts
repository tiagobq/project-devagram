import type { NextApiResponse } from "next"; // Request, Response e Handler padrão do Next
import { validarTokenJWT } from "@/middlewares/validarTokenJWT"; // Importando o middleware de validação do token JWT criado
import { conectarMongoDB } from "@/middlewares/conectarMongoDB"; // Importando o middleware de conexão com DB que foi criado
import type { RespostaPadraoMsg } from "@/types/RespostaPadraoMsg"; // Importando o tipo de resposta padrão que criamos
import { upload, uploadImagemCosmic } from "@/services/uploadImagemCosmic";
import nc from 'next-connect';

const handler = 
    nc() 
    .use(upload.single("file")) 
    .post(async (req : any, res: NextApiResponse<RespostaPadraoMsg>) => {
        const {descricao, file} = req.body;

        if(!descricao || descricao.length < 2){
            return res.status(400).json({erro: 'Descricao nao e valida'});
        }

        if(!file){
            return res.status(400).json({erro: 'Imagem e obrigatoria'});
        }
        return res.status(200).json({msg: 'Publicacao esta valida'});
    })
