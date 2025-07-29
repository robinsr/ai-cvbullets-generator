import { GenerateRequest, GenerateResponse, ResumeBulletPointParameters } from "./api"

export interface RunHistory {
  id: string
  timestamp: number
  parameters: ResumeBulletPointParameters
  request: GenerateRequest
  response: GenerateResponse
}

export interface HistoryItemProps {
  run: RunHistory
  onLoad: (run: RunHistory) => void
  onDelete: (id: string) => void
} 