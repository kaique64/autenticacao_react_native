const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const modelSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    senha: { type: String, required: true }    
}, {
    timestamps: true
})

modelSchema.pre('save', function(next){
    if(!this.isModified('senha')){
        return next();
    }

    this.senha = bcrypt.hashSync(this.senha, 10);
    next();
});

modelSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.senha, function (err, same){
        if(err){
            callback(err)
        }else{
            callback(err, same)
        }
    })
}

const Users = mongoose.model('users', modelSchema);

module.exports = Users;