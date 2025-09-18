import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const CreateSurveyModal = ({ isOpen, onClose, onCreateSurvey }) => {
  const [surveyName, setSurveyName] = useState('')

  const handleCreate = () => {
    if (surveyName.trim()) {
      onCreateSurvey(surveyName)
      setSurveyName('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create New Survey</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Survey Name</label>
            <Input
              type="text"
              placeholder="Enter survey name"
              value={surveyName}
              onChange={(e) => setSurveyName(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button 
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreate}
            className="flex-1 bg-black text-white hover:bg-gray-800"
          >
            Create Survey
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateSurveyModal