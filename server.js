require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./src/routes');

mongoose.connect(process.env.CONNECTIONSTRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, function(err) {
    if(err){
       console.log('Erro: ' + err);
    }else{
        console.log('MongoDB conectado com sucesso')
    }
})

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(5000, function(){
    console.log(`Server is running on port ${5000}`);
})