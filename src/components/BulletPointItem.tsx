
import { Copy, Check } from 'lucide-react'

interface BulletPointItemProps {
  id: string
  text: string
  copied: boolean
  onCopy: (id: string) => void
}

export function BulletPointItem({ id, text, copied, onCopy }: BulletPointItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <p className="text-gray-800 leading-relaxed text-sm">• {text}</p>
      </div>
      <button
        onClick={() => onCopy(id)}
        className="flex items-center gap-1 px-2 py-1 text-xs bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-green-600" />
            Copied
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            Copy
          </>
        )}
      </button>
    </div>
  )
} 