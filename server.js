const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const api = require('./routes/api')

const port = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({extended:true, limit: '10mb'}));
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/public', express.static('public'));
app.use(cors());

app.use(express.json({limit: '10mb'}))
app.use('/api',api)

app.listen(port,()=>{
    console.log(`server started at ${port}`);
})