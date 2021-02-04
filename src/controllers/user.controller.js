const model = require('../models/user.model');
const jwt = require('jsonwebtoken');
const secret = 'segredo';

module.exports = {
    async consultaGeral(req, res){
        const user = await model.find();
        res.json({user: user});
    },
    async cadastrar(req, res){
        const { nome, email, cpf, senha } = req.body;

        let user = await model.findOne({ cpf });

        let data = {};

        if(!user){
            data = {nome, email, cpf, senha};

            user = await model.create(data);
            
            return res.status(200).json(user);
        }else{
            return res.status(500).json({err: 'Erro ao cadastrar usuario'});
        }
    },
    async login(req, res){
        const { email, senha } = req.body;

        model.findOne({ email }, (err, user) => {
            if(err){
                console.log('Erro: ' + err);
                res.status(200).json({err: 'Erro no servidor'});
            }else if(!user){
                console.log('Email incorreto');
                res.status(200).json({status: 2, err: 'Email incorreto'})
            }else{
                user.isCorrectPassword(senha, (err, same) => {
                    if(err){
                        res.status(200).json({err: 'Erro no servidor'});
                    }else if(!same){
                        res.status(200).json({status: 2, err: 'Senha incorreta'});
                    }else{
                        const payload = { email };

                        const token = jwt.sign(payload, secret, {
                            expiresIn: '24h'
                        })

                        res.cookie('token', token, {httpOnly: true});
                        res.status(200).json({status: 1, auth: true, token: token, id_client: user._id, user_name: user.nome});
                    }   
                })
            }
        })
    }
}