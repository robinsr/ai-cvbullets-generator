import { Minus, Plus } from 'lucide-react'
import { cn } from '../lib/utils'

interface NumberInputProps {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  label?: string
  className?: string
}

export function NumberInput({ value, min, max, onChange, label, className }: NumberInputProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-sm">
        <button
          onClick={handleDecrease}
          disabled={value <= min}
          className={cn(
            "p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors",
            value <= min && "opacity-50 cursor-not-allowed"
          )}
          title="Decrease"
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <div className="px-4 py-2 text-center min-w-[60px] font-medium text-gray-900">
          {value}
        </div>
        
        <button
          onClick={handleIncrease}
          disabled={value >= max}
          className={cn(
            "p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors",
            value >= max && "opacity-50 cursor-not-allowed"
          )}
          title="Increase"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 