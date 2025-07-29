import { useState } from 'react'
import { Header } from './components/Header'
import { APISetup } from './components/APISetup'
import { ErrorDisplay } from './components/ErrorDisplay'
import { TabNavigation } from './components/TabNavigation'
import { InputForm } from './components/InputForm'
import { BulletPointsOutput } from './components/BulletPointsOutput'
import { GenerateButton } from './components/GenerateButton'

import { RunHistory } from './components/RunHistory'
import { UserAPIConfig } from './types/api'
import { RunHistory as RunHistoryType } from './types/history'
import { generateBulletPoints } from './services/proxy'
import { HistoryService } from './services/history'
import { SecureStorage } from './services/storage'

interface FormData {
  jobTitle: string
  company: string
  jobDescription: string
  workExperience: string
  skills: string
  bulletPointCount: number
}

interface GeneratedBulletPoint {
  id: string
  text: string
  copied: boolean
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: '',
    company: '',
    jobDescription: '',
    workExperience: '',
    skills: '',
    bulletPointCount: 5
  })

  const [apiConfig, setApiConfig] = useState<UserAPIConfig>(() => {
    // Try to load saved API configuration on startup
    const saved = SecureStorage.getAPIConfig()
    if (saved) {
      return {
        provider: saved.provider as 'openai' | 'anthropic',
        apiKey: saved.apiKey,
        model: saved.model
      }
    }
    return {
      provider: 'anthropic',
      apiKey: '',
      model: 'claude-3-5-sonnet-20241022'
    }
  })

  const [generatedBulletPoints, setGeneratedBulletPoints] = useState<GeneratedBulletPoint[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<'input' | 'history' | 'api'>('input')
  const [error, setError] = useState<string>('')

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateBulletPointsHandler = async () => {
    if (!apiConfig.apiKey) {
      setError('Please configure your API key first')
      setActiveTab('api')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      const response = await generateBulletPoints({
        parameters: formData,
        apiConfig
      })

      if (response.error) {
        setError(response.error)
        setGeneratedBulletPoints([])
      } else {
        const bulletPoints = response.bulletPoints.map((text, index) => ({
          id: (index + 1).toString(),
          text,
          copied: false
        }))
        setGeneratedBulletPoints(bulletPoints)

        // Save to history
        HistoryService.addRun({
          parameters: formData,
          request: {
            parameters: formData,
            apiConfig
          },
          response
        })

        // Stay on input tab to show results underneath
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate bullet points')
      setGeneratedBulletPoints([])
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (id: string) => {
    const bulletPoint = generatedBulletPoints.find(bp => bp.id === id)
    if (bulletPoint) {
      await navigator.clipboard.writeText(bulletPoint.text)
      setGeneratedBulletPoints(prev =>
        prev.map(bp =>
          bp.id === id ? { ...bp, copied: true } : bp
        )
      )

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setGeneratedBulletPoints(prev =>
          prev.map(bp =>
            bp.id === id ? { ...bp, copied: false } : bp
          )
        )
      }, 2000)
    }
  }

  const loadRunFromHistory = (run: RunHistoryType) => {
    setFormData({
      ...run.parameters,
      bulletPointCount: run.parameters.bulletPointCount || 5
    })
    setApiConfig({
      provider: run.request.apiConfig.provider,
      apiKey: apiConfig.apiKey, // Keep current API key
      model: run.request.apiConfig.model
    })
    setActiveTab('input')
  }

  const isFormValid = Boolean(formData.jobTitle && formData.company && formData.jobDescription && formData.workExperience && apiConfig.apiKey)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />

        <ErrorDisplay error={error} />

        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'history' && (
          <RunHistory onLoadRun={loadRunFromHistory} />
        )}

        {activeTab === 'api' && (
          <APISetup
            apiConfig={apiConfig}
            onConfigChange={setApiConfig}
          />
        )}

        {activeTab === 'input' && (
          <>
            <InputForm
              formData={formData}
              onInputChange={handleInputChange}
            />

            <GenerateButton
              isGenerating={isGenerating}
              isFormValid={isFormValid}
              bulletPointCount={formData.bulletPointCount}
              onBulletPointCountChange={(count) => handleInputChange('bulletPointCount', count)}
              onClick={generateBulletPointsHandler}
            />

            {/* Show results underneath the input form */}
            {generatedBulletPoints.length > 0 && (
              <div className="mt-8">
                <BulletPointsOutput
                  bulletPoints={generatedBulletPoints}
                  onCopy={copyToClipboard}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App 