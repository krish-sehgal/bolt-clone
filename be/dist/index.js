import dotenv from 'dotenv';
import Groq from "groq-sdk";
import { getSystemPrompt } from './prompts.js';
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
async function main() {
    const stream = await getGroqChatStream();
    for await (const chunk of stream) {
        // Print the completion returned by the LLM.
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}
export async function getGroqChatStream() {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: "create a simple todo app",
            },
            {
                role: "system",
                content: getSystemPrompt(),
            },
        ],
        // The language model which will generate the completion.
        model: "openai/gpt-oss-20b",
        temperature: 0.5,
        max_completion_tokens: 2000,
        // Controls diversity via nucleus sampling: 0.5 means half of all
        // likelihood-weighted options are considered.
        top_p: 1,
        // A stop sequence is a predefined or user-specified text string that
        // signals an AI to stop generating content, ensuring its responses
        // remain focused and concise. Examples include punctuation marks and
        // markers like "[end]".
        stop: null,
        stream: true,
    });
}
main();
//# sourceMappingURL=index.js.map