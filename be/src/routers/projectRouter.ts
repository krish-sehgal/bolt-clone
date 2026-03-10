import { Router } from "express"
import { chat, getTemplate } from "../controllers/projectController.js"

const projectRouter = Router()

projectRouter.post('/template', getTemplate)
projectRouter.post('/chat', chat)

export default projectRouter