import { GenerateRequest, GenerateResponse } from "../types/api"
import { BulletPointService, GenerationModel, GenerationModelId } from "../types/services"
import { createResumeBulletsPrompt } from "../utils/prompts"

/**
 * OpenAI API class for generating bullet points.
 */
export class OpenAIAPI implements BulletPointService {
  private apiKey: string
  private model: GenerationModelId
  private maxTokens: number

  static MODELS: GenerationModel[] = [
    {
      name: 'GPT-4',
      id: 'gpt-4',
      comment: 'Best Quality'
    },
    {
      name: 'GPT-4o',
      id: 'gpt-4o',
      comment: 'Best Quality'
    },
    {
      name: 'GPT-4o Mini',
      id: 'gpt-4o-mini',
      comment: 'Faster, Cheaper'
    }
  ]

  /**
   * Constructor for the OpenAIAPI class.
   * @param apiKey - The API key for the OpenAI API.
   * @param model - The model to use for the API. Default is gpt-4.
   * @param maxTokens - The maximum number of tokens to generate. Default is 1000.
   */
  constructor(
    apiKey: string,
    model: GenerationModelId = OpenAIAPI.MODELS[0].id,
    maxTokens: number = 1000) {
    this.apiKey = apiKey
    this.model = model
    this.maxTokens = maxTokens
  }

  async generateBulletPoints(request: GenerateRequest): Promise<GenerateResponse> {
    const prompt = createResumeBulletsPrompt(request.parameters)

    console.debug('OpenAI prompt:', prompt)

    const requestBody = {
      model: request.apiConfig.model || this.model,
      max_tokens: this.maxTokens,
      messages: [
        {
          role: 'system',
          content: 'You are a professional resume writer who creates compelling, targeted bullet points.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`OpenAI API error: ${error}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    // Parse the response into individual bullet points
    const bulletPoints = content
      .split('\n')
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0)
      .slice(0, request.parameters.bulletPointCount) // Use the requested number of bullet points

    return { bulletPoints }
  }
}
