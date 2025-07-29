import { ResumeBulletPointParameters } from '../types/api'



/// The basic instructions for the bullet point generation
const INSTRUCTIONS = [
  'Create 5 bullet points that rephrase the user\'s actual experience to match the target job',
  'Use action verbs and present the information in a compelling way',
  'Focus on experiences and skills that align with the job description',
  'Keep each bullet point concise (1-2 lines)',
  'Only include information that the user has explicitly provided',
  'Format as plain text without bullet points (just the text)'
]


/// Critical requirements for the bullet point generation. This prevents the AI from hallucinating.
const CRITICAL_REQUIREMENTS = [
  'Base ALL content STRICTLY on the provided work experience and skills',
  'DO NOT fabricate, invent, or add any achievements, metrics, or accomplishments not mentioned',
  'DO NOT embellish, exaggerate, or enhance existing achievements beyond what was stated',
  'DO NOT assume or infer additional responsibilities or outcomes',
  'If the user hasn\'t provided specific metrics, do not create them',
  'Focus on rephrasing existing experience to highlight relevant aspects for the target role',
  'Use the exact skills and technologies mentioned by the user',
  'Maintain truthfulness and accuracy - the user must be able to discuss these points in interviews'
]


/// The system prompt. This is the initial prompt that the AI will see.
const SYSTEM_MESSAGE = `
    You are a professional resume writer who creates accurate, truthful bullet points based ONLY 
    on the information provided by the user. Your role is to rephrase and reframe the user's 
    actual work experience to better align with the target job description.
`

const trimIndent = (text: string, separator: string = '\n') => {
  return text.split(separator)
    .map(line => line.trim())
    .join(separator)
}


/**
 * Options to customize the prompt.
 * @param systemMessage - Override the default system message.
 * @param additionalRequirements - Additional requirements to append to the critical requirements.
 * @param additionalInstructions - Additional instructions to append to the basic instructions.
 */
export interface PromptOptions {
  systemMessage?: string
  additionalRequirements?: string[]
  additionalInstructions?: string[]
}

/**
 * Creates a prompt for the bullet point generation.
 * 
 * @param parameters - The parameters for the bullet point generation.
 * @param options - The options for the bullet point generation.
 * @returns The prompt for the bullet point generation.
 */
export const createResumeBulletsPrompt = (parameters: ResumeBulletPointParameters, options: PromptOptions = {}): string => {
  const {
    systemMessage = SYSTEM_MESSAGE,
    additionalRequirements = [],
    additionalInstructions = [],
  } = options

  const bulletPointCount = parameters.bulletPointCount || 5

  const allRequirements = [...CRITICAL_REQUIREMENTS, ...additionalRequirements]
  const allInstructions = [...INSTRUCTIONS, ...additionalInstructions]

  const {
    jobTitle,
    company,
    jobDescription,
    workExperience,
    skills
  } = parameters

  const prompt = `
    ${trimIndent(systemMessage, ' ')}

    CRITICAL REQUIREMENTS:
    ${allRequirements.map(req => `- ${req}`).join('\n')}

    Job Title: ${jobTitle}
    Company: ${company}
    Job Description: ${jobDescription}

    Work Experience: ${workExperience}
    Skills: ${skills}

    Instructions:
    ${allInstructions.map(inst => `- ${inst}`).join('\n')}

    Return only the ${bulletPointCount} bullet points, one per line, without numbering or bullet symbols.`

  return trimIndent(prompt)
}
