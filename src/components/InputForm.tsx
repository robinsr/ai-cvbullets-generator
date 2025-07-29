
import { JobDetailsForm } from './JobDetailsForm'
import { WorkExperienceForm } from './WorkExperienceForm'

interface FormData {
  jobTitle: string
  company: string
  jobDescription: string
  workExperience: string
  skills: string
  bulletPointCount: number
}

interface InputFormProps {
  formData: FormData
  onInputChange: (field: keyof FormData, value: string | number) => void
}

export function InputForm({ formData, onInputChange }: InputFormProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <JobDetailsForm
        jobTitle={formData.jobTitle}
        company={formData.company}
        jobDescription={formData.jobDescription}
        onInputChange={(field, value) => onInputChange(field, value)}
      />
      <WorkExperienceForm
        workExperience={formData.workExperience}
        skills={formData.skills}
        onInputChange={(field, value) => onInputChange(field, value)}
      />
    </div>
  )
} 