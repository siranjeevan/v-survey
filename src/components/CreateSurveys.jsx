import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Sidebar from "./AssignedSurveys"


const Surveys = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "How satisfied are you with our product?",
      type: "Rating scale"
    },
    {
      id: 2, 
      text: "What features would you like to see improved?",
      type: "Text response"
    },
    {
      id: 3,
      text: "Would you recommend our product to others?",
      type: "Yes/No"
    },
    {
      id: 4,
      text: "How often do you use our product?",
      type: "Multiple choice",
      options: ["Daily", "Weekly", "Monthly", "Rarely"]
    },
    {
      id: 5,
      text: "When did you first start using our product?",
      type: "Date picker"
    },
    {
      id: 6,
      text: "What is your primary use case for our product?",
      type: "Text response"
    },
    {
      id: 7,
      text: "How would you rate our customer support?",
      type: "Rating scale"
    },
    {
      id: 8,
      text: "Which pricing plan are you currently on?",
      type: "Multiple choice",
      options: ["Free", "Basic", "Premium", "Enterprise"]
    },
    {
      id: 9,
      text: "Have you experienced any technical issues?",
      type: "Yes/No"
    },
    {
      id: 10,
      text: "What is your overall experience with our product?",
      type: "Text response"
    }
  ])
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showSurveySelectModal, setShowSurveySelectModal] = useState(false)
  const [selectedSurveys, setSelectedSurveys] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showPersonnelModal, setShowPersonnelModal] = useState(false)


  
  const [activeSurveys, setActiveSurveys] = useState([
    { id: 1, name: 'Customer Satisfaction Survey', date: '2024-01-15' },
    { id: 2, name: 'Product Feedback Survey', date: '2024-01-14' },
    { id: 3, name: 'Market Research Survey', date: '2024-01-13' },
    { id: 4, name: 'Employee Engagement Survey', date: '2024-01-12' },
    { id: 5, name: 'Brand Awareness Survey', date: '2024-01-11' }
  ])

  const toggleQuestionSelection = (questionId) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    )
  }

  const createSurvey = (name) => {
    if(selectedQuestions.length === 0) {
      alert("Please select questions to create a survey")
      return
    }

    const newSurvey = {
      id: activeSurveys.length + 1,
      name: name,
      date: new Date().toISOString().split('T')[0],
      questions: selectedQuestions
    }
    setActiveSurveys([...activeSurveys, newSurvey])
    setSelectedQuestions([])
    alert("Survey created successfully!")
  }

  return (
    <div className="w-170 flex flex-col xl:flex-col mt-4 sm:mt-8 md:mt-12 lg:mt-16 px-2 sm:px-4 md:px-15">
      <div className="flex-1">
        <div className="flex flex-col mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">Create New Survey</h1>
          <h1 className="text-sm sm:text-base md:text-lg lg:text-x text-gray-400 font-extralight p-2">Select questions and create survey</h1>
        </div>
      </div>
      <label className="text-xs sm:text-sm font-bold text-black mb-2">SURVEY NAME</label>
      <div className="flex flex-row">
        <input
            type="text"
            placeholder="Type your survey name here"
            className="bg-transparent text-[20px] border-none outline-none placeholder-gray-400 focus:placeholder-transparent text-base px-2 py-2 w-100"
        />
        <div className="bg-black w-35 text-[15px] p-2 rounded-[15px] flex justify-center text-white ">
          <button onClick={() => setShowCreateModal(true)}>+ CreateSurvey</button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4  mt-5">
        <h2 className="text-xl font-semibold">Available Questions</h2>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowSurveySelectModal(true)}
            disabled={selectedQuestions.length === 0}
            className="bg-black text-white"
          >
            Select Survey
          </Button>
        </div>
      </div>

      <div className="mt-5">
        {questions.map((question) => (
          <div key={question.id} className="bg-white shadow-md p-4 mb-4 rounded">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedQuestions.includes(question.id)}
                onChange={() => toggleQuestionSelection(question.id)}
                className="mr-4"
              />
              <div>
                <p className="font-medium">{question.text}</p>
                <p className="text-sm text-gray-500">{question.type}</p>
                {question.options && question.options.length > 0 && (
                  <div className="ml-4 mt-2">
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input type="checkbox" disabled className="mr-2" />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full xl:w-80 2xl:w-96">
        <Sidebar />
      </div>

      {showSurveySelectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Select Surveys</h3>
              <button 
                onClick={() => setShowSurveySelectModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <Input
              type="text"
              placeholder="Search surveys..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            
            <div className="mb-4">
              <Button 
                onClick={() => setSelectedSurveys(activeSurveys.map(s => s.id))}
                className="mr-2 text-xs"
                variant="outline"
              >
                Select All
              </Button>
              <Button 
                onClick={() => setSelectedSurveys([])}
                variant="outline"
                className="text-xs"
              >
                Clear All
              </Button>
            </div>
            
            <div className="space-y-2 mb-4">
              {activeSurveys
                .filter(survey => survey.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((survey) => (
                <div key={survey.id} className="flex items-center p-2 border rounded">
                  <input
                    type="checkbox"
                    checked={selectedSurveys.includes(survey.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSurveys([...selectedSurveys, survey.id])
                      } else {
                        setSelectedSurveys(selectedSurveys.filter(id => id !== survey.id))
                      }
                    }}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium">{survey.name}</p>
                    <p className="text-sm text-gray-500">{survey.date}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                onClick={() => setShowSurveySelectModal(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setShowSurveySelectModal(false)
                  setShowPersonnelModal(true)
                }}
                className="bg-black text-white"
                disabled={selectedSurveys.length === 0}
              >
                Assign to Personnel ({selectedSurveys.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Surveys

