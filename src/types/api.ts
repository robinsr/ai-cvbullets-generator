import { GenerationModelId } from "./services"

export interface UserAPIConfig {
  provider: 'openai' | 'anthropic'
  apiKey: string
  model?: GenerationModelId
  maxTokens?: number
}

export interface ResumeBulletPointParameters {
  jobTitle: string
  company: string
  jobDescription: string
  workExperience: string
  skills: string
  bulletPointCount: number
}

export interface GenerateRequest {
  parameters: ResumeBulletPointParameters
  apiConfig: UserAPIConfig
}

export interface GenerateResponse {
  bulletPoints: string[]
  error?: string
} 