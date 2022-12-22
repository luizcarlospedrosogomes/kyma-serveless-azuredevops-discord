const { default: axios } = require('axios');
var express = require('express');
const kyma = require('./kyma');
var app = express();
require('dotenv').config();
app.use(express.json());     
app.use(express.urlencoded());

app.get('/',(req,res) =>{
    res.json({'msg': 'workitem'})
})
app.post('/', async function(req, res){    
   const event = {}
   event['extensions'] = {}
   event['data'] = req.body;
   event['extensions']['response'] = res;
   event['extensions']['request'] = req;
   return  kyma.main(event, null);
   
});

app.listen(3000);