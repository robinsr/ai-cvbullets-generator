
import { Sparkles } from 'lucide-react'
import { cn } from '../lib/utils'
import { NumberInput } from './NumberInput'

interface GenerateButtonProps {
  isGenerating: boolean
  isFormValid: boolean
  bulletPointCount: number
  onBulletPointCountChange: (count: number) => void
  onClick: () => void
}

export function GenerateButton({ isGenerating, isFormValid, bulletPointCount, onBulletPointCountChange, onClick }: GenerateButtonProps) {
  return (
    <div className="flex justify-center items-end gap-6 mt-6">
      <NumberInput
        value={bulletPointCount}
        min={3}
        max={10}
        onChange={onBulletPointCountChange}
        label="Bullet Points"
      />
      
      <button
        onClick={onClick}
        disabled={!isFormValid || isGenerating}
        className={cn(
          "btn-primary flex items-center gap-2 px-6 py-2.5 text-base",
          (!isFormValid || isGenerating) && "opacity-50 cursor-not-allowed"
        )}
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate Bullet Points
          </>
        )}
      </button>
    </div>
  )
} 