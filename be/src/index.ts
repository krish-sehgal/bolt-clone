import dotenv from 'dotenv'
import Groq from "groq-sdk";
import { getSystemPrompt } from './prompts.js';

dotenv.config()

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
        content: "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n\ncreate a simple todo app",
      },
      {
        role: "system",
        content: getSystemPrompt(),
      },
    ],

    // The language model which will generate the completion.
    model: "openai/gpt-oss-20b",
    temperature: 0.5,
    max_completion_tokens: 1024,

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