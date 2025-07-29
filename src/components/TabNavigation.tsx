
import { cn } from '../lib/utils'

interface TabNavigationProps {
  activeTab: 'input' | 'history' | 'api'
  onTabChange: (tab: 'input' | 'history' | 'api') => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex bg-white rounded-lg p-1 shadow-sm border">
        <button
          onClick={() => onTabChange('input')}
          className={cn(
            "px-6 py-2 rounded-md font-medium transition-colors",
            activeTab === 'input' 
              ? "bg-primary-600 text-white" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          Input Details
        </button>
        <button
          onClick={() => onTabChange('history')}
          className={cn(
            "px-6 py-2 rounded-md font-medium transition-colors",
            activeTab === 'history' 
              ? "bg-primary-600 text-white" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          History
        </button>
        <button
          onClick={() => onTabChange('api')}
          className={cn(
            "px-6 py-2 rounded-md font-medium transition-colors",
            activeTab === 'api' 
              ? "bg-primary-600 text-white" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          API Configuration
        </button> 
      </div>
    </div>
  )
} 