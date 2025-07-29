import { GenerateRequest, GenerateResponse } from "./api"

export type BulletPointService = {
  generateBulletPoints: (request: GenerateRequest) => Promise<GenerateResponse>
}

export type GenerationModelId = string

export type GenerationModel = {
  name: string,
  id: GenerationModelId,
  comment: string
}

export type GenerationModelProvider = 'openai' | 'anthropic'

