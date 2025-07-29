
import { Sparkles } from 'lucide-react'
import { BulletPointItem } from './BulletPointItem'

interface GeneratedBulletPoint {
  id: string
  text: string
  copied: boolean
}

interface BulletPointsOutputProps {
  bulletPoints: GeneratedBulletPoint[]
  onCopy: (id: string) => void
}

export function BulletPointsOutput({ bulletPoints, onCopy }: BulletPointsOutputProps) {
  return (
    <div className="space-y-4">
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-primary-600" />
          <h2 className="text-lg font-semibold">Generated Bullet Points</h2>
        </div>
        
        {bulletPoints.length > 0 ? (
          <div className="space-y-3">
            {bulletPoints.map((bulletPoint) => (
              <BulletPointItem
                key={bulletPoint.id}
                id={bulletPoint.id}
                text={bulletPoint.text}
                copied={bulletPoint.copied}
                onCopy={onCopy}
              />
            ))}
            <div className="text-xs text-gray-500 text-center pt-2">
              Generated {bulletPoints.length} bullet point{bulletPoints.length !== 1 ? 's' : ''}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No bullet points generated yet. Fill out the form and click generate to get started.
          </div>
        )}
      </div>
    </div>
  )
} 