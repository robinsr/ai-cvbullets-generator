
import { useState } from 'react'
import { Clock, Trash2, RotateCcw, Briefcase, Target, Copy } from 'lucide-react'
import { HistoryItemProps } from '../types/history'
import { cn } from '../lib/utils'

export function HistoryItem({ run, onLoad, onDelete }: HistoryItemProps) {
  const [copying, setCopying] = useState(false)
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const copyAllBulletPoints = async () => {
    if (copying) return
    
    setCopying(true)
    try {
      const allBulletPoints = run.response.bulletPoints.join('\n')
      await navigator.clipboard.writeText(allBulletPoints)
      // Brief visual feedback
      setTimeout(() => setCopying(false), 1000)
    } catch (error) {
      console.error('Failed to copy bullet points:', error)
      setCopying(false)
    }
  }

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{formatDate(run.timestamp)}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyAllBulletPoints}
            disabled={copying}
            className={cn(
              "flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors",
              copying
                ? "bg-green-100 text-green-800 cursor-not-allowed"
                : "bg-green-50 text-green-700 hover:bg-green-100"
            )}
            title={copying ? "Copied!" : "Copy all bullet points"}
          >
            <Copy className="w-3 h-3" />
            {copying ? "Copied!" : "Copy All"}
          </button>
          <button
            onClick={() => onLoad(run)}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded hover:bg-primary-100 transition-colors"
            title="Load this run"
          >
            <RotateCcw className="w-3 h-3" />
            Load
          </button>
          <button
            onClick={() => onDelete(run.id)}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
            title="Delete this run"
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {/* Job Details */}
        <div className="flex items-start gap-2">
          <Target className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900">
              {run.parameters.jobTitle} at {run.parameters.company}
            </div>
            <div className="text-sm text-gray-600">
                              {truncateText(run.parameters.jobDescription)}
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="flex items-start gap-2">
          <Briefcase className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-600">
                              {truncateText(run.parameters.workExperience)}
            </div>
          </div>
        </div>

        {/* Generated Bullet Points */}
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">
            Generated Bullet Points ({run.response.bulletPoints.length})
          </div>
          <div className="space-y-1">
            {run.response.bulletPoints.slice(0, 2).map((bullet: string, index: number) => (
              <div key={index} className="text-sm text-gray-600">
                • {truncateText(bullet, 80)}
              </div>
            ))}
            {run.response.bulletPoints.length > 2 && (
              <div className="text-xs text-gray-500">
                +{run.response.bulletPoints.length - 2} more...
              </div>
            )}
          </div>
        </div>

        {/* API Config */}
        <div className="text-xs text-gray-500">
          Generated with {run.request.apiConfig.provider} ({run.request.apiConfig.model})
        </div>
      </div>
    </div>
  )
} 