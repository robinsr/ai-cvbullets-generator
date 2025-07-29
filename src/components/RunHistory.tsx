import { useState, useEffect } from 'react'
import { History, Trash2, AlertCircle } from 'lucide-react'
import { RunHistory as RunHistoryType } from '../types/history'
import { HistoryService } from '../services/history'
import { HistoryItem } from './HistoryItem'

interface RunHistoryProps {
  onLoadRun: (run: RunHistoryType) => void
}

export function RunHistory({ onLoadRun }: RunHistoryProps) {
  const [history, setHistory] = useState<RunHistoryType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    setIsLoading(true)
    const storedHistory = HistoryService.getHistory()
    setHistory(storedHistory.sort((a, b) => b.timestamp - a.timestamp))
    setIsLoading(false)
  }

  const handleDelete = (id: string) => {
    HistoryService.deleteRun(id)
    setHistory(prev => prev.filter(run => run.id !== id))
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all history? This cannot be undone.')) {
      HistoryService.clearHistory()
      setHistory([])
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-semibold">Run History</h2>
          </div>
          <div className="text-center py-8 text-gray-500">
            Loading history...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-semibold">Run History</h2>
            <span className="text-sm text-gray-500">({history.length} runs)</span>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
        
        {history.length > 0 ? (
          <div className="space-y-4">
            {history.map((run) => (
              <HistoryItem
                key={run.id}
                run={run}
                onLoad={onLoadRun}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No run history yet.</p>
            <p className="text-sm text-gray-400 mt-1">
              Generate some bullet points to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 