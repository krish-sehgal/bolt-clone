import dotenv from 'dotenv';
import Groq from "groq-sdk";
import express from "express";
import { BASE_PROMPT, getSystemPrompt } from './prompts.js';
import { basePrompt as reactBasePrompt } from './defaults/react.js';
import { basePrompt as nodeBasePrompt } from './defaults/node.js';
import cors from 'cors';
import connectdb from './config/db.js';
import userRouter from './routers/userRoute.js';
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/user', userRouter);
app.post('/template', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
                {
                    role: "system",
                    content: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
                },
            ],
            model: "openai/gpt-oss-20b",
            temperature: 0.5,
            max_completion_tokens: 200,
            top_p: 1,
            stop: null,
        });
        const answer = response.choices[0]?.message.content;
        if (answer != 'react' && answer != 'node') {
            return res.status(403).json({ message: 'neither react nor node' });
        }
        if (answer == 'react') {
            res.json({
                success: true,
                prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
                uiPrompts: [reactBasePrompt]
            });
        }
        if (answer == 'node') {
            res.json({
                success: true,
                prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
                uiPrompts: [nodeBasePrompt]
            });
        }
    }
    catch (error) {
        res.json({
            success: false,
            message: 'saale gareeb free api call kr raha ha lund lele mera'
        });
    }
});
app.post('/chat', async (req, res) => {
    const messages = req.body.messages;
    messages.push({ role: 'system', content: getSystemPrompt() });
    try {
        const response = await groq.chat.completions.create({
            messages: messages,
            model: "openai/gpt-oss-20b",
            temperature: 0.5,
            max_completion_tokens: 8000,
            top_p: 1,
            stop: null,
        });
        // console.log(response.choices[0]?.message.content);
        res.json({
            response: response.choices[0]?.message.content
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: 'saale gareeb free api call kr raha ha lund lele mera'
        });
    }
});
connectdb()
    .then(() => {
    app.listen('8000', () => {
        console.log('server running');
    });
});
//# sourceMappingURL=index.js.map