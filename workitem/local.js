const { default: axios } = require('axios');
var express = require('express');
var app = express();
require('dotenv').config();
app.use(express.json());     
app.use(express.urlencoded());

app.get('/',(req,res) =>{
    res.json({'msg': 'workitem'})
})
app.post('/', async function(req, res){    
   const { message } = req.body;
   const discordMesssage = {}
   discordMesssage['content'] = message.markdown;
   try {
        await axios.post(process.env.WEBHOOK_DISCORD, discordMesssage);
        return res.json({msg: 'mensagem publicada no canal'}).status(201) 
   } catch (error) {
    return res.json({ msg: 'não foi possivel publicar a mensagem'}).status(500) 
   }
   
});

app.listen(3000);