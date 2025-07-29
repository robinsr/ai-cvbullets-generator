import { useState, useEffect } from 'react'
import { Eye, EyeOff, Key, Save, Trash2 } from 'lucide-react'
import { UserAPIConfig } from '../types/api'
import { cn } from '../lib/utils'
import { SecureStorage } from '../services/storage'
import { AnthropicAPI } from '../services/anthropic'
import { OpenAIAPI } from '../services/openai'
import { GenerationModelProvider } from '../types/services'

interface APISetupProps {
  apiConfig: UserAPIConfig
  onConfigChange: (config: UserAPIConfig) => void
}

export function APISetup({ apiConfig, onConfigChange }: APISetupProps) {
  const [showKey, setShowKey] = useState(false)
  const [hasStoredConfig, setHasStoredConfig] = useState(false)

  useEffect(() => {
    setHasStoredConfig(SecureStorage.hasStoredAPIConfig())
  }, [])

  const handleProviderChange = (provider: GenerationModelProvider) => {
    onConfigChange({
      ...apiConfig,
      provider,
      model: provider === 'openai' ? OpenAIAPI.MODELS[0].id : AnthropicAPI.MODELS[0].id
    })
  }

  const handleKeyChange = (apiKey: string) => {
    onConfigChange({ ...apiConfig, apiKey })
  }

  const handleModelChange = (model: string) => {
    onConfigChange({ ...apiConfig, model })
  }

  const handleSaveConfig = () => {
    if (apiConfig.apiKey) {
      SecureStorage.saveAPIConfig({
        provider: apiConfig.provider,
        apiKey: apiConfig.apiKey,
        model: apiConfig.model || ''
      })
      setHasStoredConfig(true)
    }
  }

  const handleLoadStoredConfig = () => {
    const stored = SecureStorage.getAPIConfig()
    if (stored) {
      onConfigChange({
        provider: stored.provider as 'openai' | 'anthropic',
        apiKey: stored.apiKey,
        model: stored.model
      })
    }
  }

  const handleClearStoredConfig = () => {
    if (window.confirm('Are you sure you want to clear your saved API configuration? This cannot be undone.')) {
      SecureStorage.clearAPIConfig()
      setHasStoredConfig(false)
      onConfigChange({ ...apiConfig, apiKey: '' })
    }
  }

  return (
    <div className="mb-6">

      <div className="mt-4 card">
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold">Configure AI Service</h3>
        </div>

        <div className="space-y-4">
          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AI Provider
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="provider"
                  value="anthropic"
                  checked={apiConfig.provider === 'anthropic'}
                  onChange={() => handleProviderChange('anthropic')}
                  className="text-primary-600"
                />
                <span>Anthropic (Claude) - Recommended</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="provider"
                  value="openai"
                  checked={apiConfig.provider === 'openai'}
                  onChange={() => handleProviderChange('openai')}
                  className="text-primary-600"
                />
                <span>OpenAI (GPT)</span>
              </label>
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model
            </label>
            <select
              value={apiConfig.model}
              onChange={(e) => handleModelChange(e.target.value)}
              className="input-field"
            >
              {apiConfig.provider === 'anthropic' ? (
                <>
                  {AnthropicAPI.MODELS.map((model) => (
                    <option key={model.id} value={model.id}>{model.name} ({model.comment})</option>
                  ))}
                </>
              ) : (
                <>
                  {OpenAIAPI.MODELS.map((model) => (
                    <option key={model.id} value={model.id}>{model.name} ({model.comment})</option>
                  ))}
                </>
              )}
            </select>
          </div>

          {/* API Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiConfig.apiKey}
                onChange={(e) => handleKeyChange(e.target.value)}
                placeholder={`Enter your ${apiConfig.provider === 'anthropic' ? 'Anthropic' : 'OpenAI'} API key`}
                className="input-field pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Your API key is stored locally and never sent to our servers.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">How to get your API key:</h4>
            {apiConfig.provider === 'anthropic' ? (
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Go to <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="underline">console.anthropic.com</a></li>
                <li>2. Sign up or log in to your account</li>
                <li>3. Navigate to API Keys section</li>
                <li>4. Create a new API key and paste it above</li>
              </ol>
            ) : (
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">platform.openai.com/api-keys</a></li>
                <li>2. Sign up or log in to your account</li>
                <li>3. Click "Create new secret key"</li>
                <li>4. Copy the key and paste it above</li>
              </ol>
            )}
          </div>

          {/* Storage Management */}
          <div className="border-t pt-4 mt-4">
            <h4 className="font-medium text-gray-900 mb-3">API Configuration Storage</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSaveConfig}
                disabled={!apiConfig.apiKey}
                className={cn(
                  "flex items-center gap-1 px-3 py-1 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors",
                  !apiConfig.apiKey && "opacity-50 cursor-not-allowed"
                )}
              >
                <Save className="w-4 h-4" />
                Save Configuration
              </button>
              
              {hasStoredConfig && (
                <>
                  <button
                    onClick={handleLoadStoredConfig}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                  >
                    <Key className="w-4 h-4" />
                    Load Saved
                  </button>
                  <button
                    onClick={handleClearStoredConfig}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Saved
                  </button>
                </>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Your API key is encrypted and stored locally in your browser. It's never sent to our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 