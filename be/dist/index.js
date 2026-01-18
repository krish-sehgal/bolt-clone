import dotenv from 'dotenv';
import Groq from "groq-sdk";
import express from "express";
import { BASE_PROMPT, getSystemPrompt } from './prompts.js';
import { basePrompt as reactBasePrompt } from './defaults/react.js';
import { basePrompt as nodeBasePrompt } from './defaults/node.js';
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const app = express();
app.use(express.json());
app.post('/template', async (req, res) => {
    const prompt = req.body.prompt;
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
            prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [reactBasePrompt]
        });
    }
    if (answer == 'node') {
        res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [nodeBasePrompt]
        });
    }
});
app.post('/chat', async (req, res) => {
    const messages = req.body.messages;
    messages.push({ role: 'system', content: getSystemPrompt() });
    const response = await groq.chat.completions.create({
        messages: messages,
        model: "openai/gpt-oss-20b",
        temperature: 0.5,
        max_completion_tokens: 8000,
        top_p: 1,
        stop: null,
    });
    console.log(response.choices[0]?.message.content);
    res.json({});
});
app.listen('8000', () => {
    console.log('server running');
});
//   return groq.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n\ncreate a simple todo app",
//       },
//       {
//         role: "user",
//         content: BASE_PROMPT
//       },
//       {
//         role: "user",
//         content: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
//       },
//       {
//         role: "user",
//         content: "create a todo app"
//       },
//       {
//         role: "system",
//         content: getSystemPrompt(),
//       },
//     ],
//     // The language model which will generate the completion.
//     model: "openai/gpt-oss-20b",
//     temperature: 0.5,
//     max_completion_tokens: 8000,
//     // Controls diversity via nucleus sampling: 0.5 means half of all
//     // likelihood-weighted options are considered.
//     top_p: 1,
//     // A stop sequence is a predefined or user-specified text string that
//     // signals an AI to stop generating content, ensuring its responses
//     // remain focused and concise. Examples include punctuation marks and
//     // markers like "[end]".
//     stop: null,
//     stream: true,
//   });
// }
// main();
//# sourceMappingURL=index.js.map