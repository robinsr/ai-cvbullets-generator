import { RunHistory } from '../types/history'

const HISTORY_KEY = 'resume-bullet-point-history'
const MAX_HISTORY_ITEMS = 50

export class HistoryService {
  static getHistory(): RunHistory[] {
    try {
      const stored = localStorage.getItem(HISTORY_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading history:', error)
      return []
    }
  }

  static saveHistory(history: RunHistory[]): void {
    try {
      // Keep only the most recent items
      const limitedHistory = history.slice(-MAX_HISTORY_ITEMS)
      localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory))
    } catch (error) {
      console.error('Error saving history:', error)
    }
  }

  static addRun(run: Omit<RunHistory, 'id' | 'timestamp'>): void {
    const history = this.getHistory()
    const newRun: RunHistory = {
      ...run,
      id: this.generateId(),
      timestamp: Date.now()
    }
    history.push(newRun)
    this.saveHistory(history)
  }

  static deleteRun(id: string): void {
    const history = this.getHistory()
    const filteredHistory = history.filter(run => run.id !== id)
    this.saveHistory(filteredHistory)
  }

  static clearHistory(): void {
    try {
      localStorage.removeItem(HISTORY_KEY)
    } catch (error) {
      console.error('Error clearing history:', error)
    }
  }

  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
} 