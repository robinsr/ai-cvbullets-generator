import { GenerateRequest, GenerateResponse } from "../types/api"
import { BulletPointService, GenerationModel, GenerationModelId } from "../types/services"
import { createResumeBulletsPrompt } from "../utils/prompts"

/**
 * Anthropic API class for generating bullet points.
 */
export class AnthropicAPI implements BulletPointService {
  private apiKey: string
  private model: GenerationModelId
  private maxTokens: number

  static MODELS: GenerationModel[] = [
    {
      name: 'Claude 3.5 Sonnet',
      id: 'claude-3-5-sonnet-20241022',
      comment: 'Recommended'
    },
    {
      name: 'Claude 3.5 Haiku',
      id: 'claude-3-5-haiku-20241022',
      comment: 'Faster, Cheaper'
    },
    {
      name: 'Claude 3 Opus',
      id: 'claude-3-opus-20240229',
      comment: 'Best Quality'
    }
  ]

  /**
   * Constructor for the AnthropicAPI class.
   * @param apiKey - The API key for the Anthropic API.
   * @param model - The model to use for the API. Default is claude-3-5-sonnet-20241022.
   * @param maxTokens - The maximum number of tokens to generate. Default is 1000.
   */
  constructor(
    apiKey: string,
    model: GenerationModelId = AnthropicAPI.MODELS[0].id,
    maxTokens: number = 1000) {
    this.apiKey = apiKey
    this.model = model
    this.maxTokens = maxTokens
  }

  async generateBulletPoints(request: GenerateRequest): Promise<GenerateResponse> {
    const prompt = createResumeBulletsPrompt(request.parameters)

    console.debug('Anthropic prompt:', prompt)

    const requestBody = {
      model: this.model,
      max_tokens: this.maxTokens,
      messages: [{ role: 'user', content: [{ type: 'text', text: prompt }] }]
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Anthropic API error: ${error}`)
    }

    const data = await response.json()

    const content = data.content[0].text

    // Parse the response into individual bullet points
    const bulletPoints = content
      .split('\n')
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0)
      .slice(0, request.parameters.bulletPointCount) // Use the requested number of bullet points

    return { bulletPoints }
  }
}
