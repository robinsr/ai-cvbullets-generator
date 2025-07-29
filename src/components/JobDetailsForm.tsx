
import { Target } from 'lucide-react'

interface JobDetailsFormProps {
  jobTitle: string
  company: string
  jobDescription: string
  onInputChange: (field: 'jobTitle' | 'company' | 'jobDescription', value: string) => void
}

export function JobDetailsForm({ jobTitle, company, jobDescription, onInputChange }: JobDetailsFormProps) {
  return (
    <div className="space-y-4">
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-primary-600" />
          <h2 className="text-lg font-semibold">Target Job Details</h2>
        </div>
        
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => onInputChange('jobTitle', e.target.value)}
                placeholder="e.g., Senior Software Engineer"
                className="input-field py-1.5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => onInputChange('company', e.target.value)}
                placeholder="e.g., Google, Microsoft"
                className="input-field py-1.5"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => onInputChange('jobDescription', e.target.value)}
              placeholder="Paste the job description here..."
              rows={4}
              className="input-field resize-none py-1.5"
            />
          </div>
        </div>
      </div>


    </div>
  )
} 