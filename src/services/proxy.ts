import { GenerateRequest, GenerateResponse } from '../types/api'
import { BulletPointService } from '../types/services'


import { AnthropicAPI } from './anthropic'
import { OpenAIAPI } from './openai'

export async function generateBulletPoints(request: GenerateRequest): Promise<GenerateResponse> {

  let service: BulletPointService

  switch (request.apiConfig.provider) {
    case 'anthropic':
      service = new AnthropicAPI(request.apiConfig.apiKey, request.apiConfig.model, request.apiConfig.maxTokens)
      break
    case 'openai':
      service = new OpenAIAPI(request.apiConfig.apiKey, request.apiConfig.model, request.apiConfig.maxTokens)
      break
    default:
      throw new Error(`Unsupported provider: ${request.apiConfig.provider}`)
  }

  try {
    return await service.generateBulletPoints(request)
  } catch (error) {
    console.error('Proxy server failed, trying fallback...', error)
    return {
      bulletPoints: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
