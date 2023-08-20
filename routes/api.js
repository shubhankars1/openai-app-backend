const express = require('express');
let router = express.Router();
require('dotenv').config();

const Configuration = require('openai').Configuration;
const OpenAIApi = require('openai').OpenAIApi;

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION_KEY,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// ######################### Api start here #################################
router.post('/sendcontent', async (req,res)=>{
    const {chats} = req.body;
    let params = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are JargonGPT. You will assist me in finding answers from a given information?"
            },
            "Analyse this information, \n"+chats,
        ]
    }

    try {
        const result = await openai.createChatCompletion(params)
        result.then((response) => {
            res.status(202).json({
                data: result.data.choices[0].message,    
                success: true,
                message:'success'
            })
        })
        .catch((error) => {
            res.status(202).json({
                data: [],
                success: false,
                message:'failure'
            })
        })
    } catch (error) {
        res.status(202).json({
            data: [            
                    {
                        role: "system",
                        content: "Sorry, I am not been able to understand, what are you saying?"
                    }
            ],    
            success: false,
            message:'failure'
        })
    }
});

router.post('/chat', async (req,res)=>{
    const {chats} = req.body;
    let params = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are JargonGPT. You will assist me in finding answers from a given file?"
            },
            chats,
        ]
    }

    // console.log(req.body.chats, params);
    try {
        const result = await openai.createChatCompletion(params)

        result.then((response) => {
            res.status(202).json({
                data: result.data.choices[0].message,    
                success: true,
                message:'success'
            })
        })
        .catch((error) => {
            res.status(202).json({
                data: [],
                success: false,
                message:'failure'
            })
        })
    } catch (error) {
        res.status(202).json({
            data: [            
                    {
                        role: "system",
                        content: "Sorry, I am not been able to understand, what are you saying?"
                    }
            ],    
            success: false,
            message:'failure'
        })
    }
});
// ########################## Api End here #################################


module.exports=router;