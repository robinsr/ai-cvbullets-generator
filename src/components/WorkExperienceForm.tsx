
import { Briefcase } from 'lucide-react'

interface WorkExperienceFormProps {
  workExperience: string
  skills: string
  onInputChange: (field: 'workExperience' | 'skills', value: string) => void
}

export function WorkExperienceForm({ workExperience, skills, onInputChange }: WorkExperienceFormProps) {
  return (
    <div className="space-y-4">
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-4 h-4 text-primary-600" />
          <h2 className="text-lg font-semibold">Your Work Experience</h2>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Experience Description
            </label>
            <textarea
              value={workExperience}
              onChange={(e) => onInputChange('workExperience', e.target.value)}
              placeholder="Describe your relevant work experience, responsibilities, and achievements..."
              rows={4}
              className="input-field resize-none py-1.5"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Skills & Technologies
            </label>
            <textarea
              value={skills}
              onChange={(e) => onInputChange('skills', e.target.value)}
              placeholder="List your relevant skills, technologies, and tools..."
              rows={2}
              className="input-field resize-none py-1.5"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 