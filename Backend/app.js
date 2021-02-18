import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express=require('express');

const { getMaxListeners } = require('process');
// import {sendEmail} from './sendEmail'
const sendEmail=require('./sendEmail')
const app=express();
const port=9090;

app.get('/',(req,res)=>{
    res.send('hello')
})
app.get('/sendemail',(req,res)=>{
    sendEmail('pk9923446@gmail.com',`Your email has been verified`)

    
})

app.listen(port,()=>{
    console.log(`listening at port number ${port}`)
})