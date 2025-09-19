import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Sidebar from "./AssignedSurveys"
// import CreateSurveyModal from "./unwanted/CreateSurveyModal"
// import PersonnelSelectionModal from "./PersonnelSelectionModal"

const Surveys = () => {
  const [surveyName, setSurveyName] = useState('')
  const [questionText, setQuestionText] = useState('')
  const [responseType, setResponseType] = useState('')
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
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([''])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showPersonnelModal, setShowPersonnelModal] = useState(false)
  
  const [activeSurveys, setActiveSurveys] = useState([
    { id: 1, name: 'Customer Satisfaction Survey', date: '2024-01-15' },
    { id: 2, name: 'Product Feedback Survey', date: '2024-01-14' },
    { id: 3, name: 'Market Research Survey', date: '2024-01-13' }
  ])

  const responseTypes = ['Text response', 'Multiple choice', 'Rating scale', 'Yes/No', 'Date picker']



  const addQuestion = () => {
    if (questionText && responseType) {
      const newQuestion = {
        id: questions.length + 1,
        text: questionText,
        type: responseType,
        options: responseType === 'Multiple choice' ? multipleChoiceOptions : []
      }
      setQuestions([...questions, newQuestion])
      setQuestionText('')
      setResponseType('')
      setMultipleChoiceOptions([''])
    }
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...multipleChoiceOptions]
    newOptions[index] = value
    setMultipleChoiceOptions(newOptions)
  }

  const addOption = () => {
    setMultipleChoiceOptions([...multipleChoiceOptions, ''])
  }

  const toggleQuestionSelection = (questionId) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    )
  }

  const createSurvey = (name) => {
    const newSurvey = {
      id: activeSurveys.length + 1,
      name: name,
      date: new Date().toISOString().split('T')[0]
    }
    setActiveSurveys([...activeSurveys, newSurvey])
  }

  const handleServeQuestions = () => {
    if (selectedQuestions.length > 0) {
      setShowPersonnelModal(true)
    }
  }

  const handleAssignSurvey = (questions, personnel) => {
    console.log('Assigning questions:', questions, 'to personnel:', personnel)
    setShowPersonnelModal(false)
    setSelectedQuestions([])
  }

  return (
    <div className="w-170 flex flex-col xl:flex-col mt-4 sm:mt-8 md:mt-12 lg:mt-16 px-2 sm:px-4 md:px-15">
      <div className="flex-1">
        <div className="flex flex-col mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">Create Survey Questionnaire</h1>
          <h1 className="text-sm sm:text-base md:text-lg lg:text-x text-gray-400 font-extralight p-2">Manage and create questionnaires</h1>
        </div>
      </div>

      {/* <label className="text-xs sm:text-sm font-bold text-black mb-2">SURVEY NAME</label>
      <div className="flex flex-row">
        <select
          className="w-60 p-3 sm:p-4 md:p-2 border rounded-l-sm text-sm sm:text-base border-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
          required
          value={surveyName}
          onChange={(e) => setSurveyName(e.target.value)}
        >
          <option>Select The Survey</option>
          {responseTypes.map((survey, index) => (
            <option key={index}>{survey}</option>
          ))}
        </select>
        <div className="bg-black w-35 text-[15px] p-2 rounded-r-sm flex justify-center text-white">
          <button onClick={() => setShowCreateModal(true)}>CreateSurvey</button>
        </div>
      </div> */}

      <div className="w-full h-full bg-white shadow-2xl p-7 -mt-5">
        <label className="block text-xs sm:text-[12px] font-bold text-black mb-2">QUESTION</label>
        <Input
          type="text"
          placeholder="Enter your survey question here"
          required
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="rounded-[5px] border-gray-400 p-3 sm:p-4 md:p-5 text-sm sm:text-base"
        />
        
        <label className="block text-xs sm:text-[12px] font-bold text-black mb-2 mt-5">RESPONSE TYPE</label>
        <div className="flex flex-row">
          <select
            className="w-60 p-3 sm:p-4 md:p-2.5 border mr-20 text-sm sm:text-base rounded-[5px] border-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            required
            value={responseType}
            onChange={(e) => setResponseType(e.target.value)}
          >
            <option value="">Select response type</option>
            {responseTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>

          <div className="bg-black w-35 text-[15px] p-2 rounded-[8px] flex justify-center text-white">
            <button onClick={addQuestion}>+ Add Question</button>
          </div>
        </div>

        {responseType === 'Multiple choice' && (
          <div className="mt-4">
            <label className="block text-xs sm:text-[12px] font-bold text-black mb-2">MULTIPLE CHOICE OPTIONS</label>
            {multipleChoiceOptions.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  disabled
                />
                <Input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1 rounded-[5px] border-gray-400 p-2"
                />
              </div>
            ))}
            <Button onClick={addOption} className="mt-2">+ Add Option</Button>
          </div>
        )}
      </div>

      <div className="mt-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Available Questions</h2>
          {/* <Button 
            onClick={handleServeQuestions}
            disabled={selectedQuestions.length === 0}
            className="bg-black text-white"
          >
            Serve Selected Questions ({selectedQuestions.length})
          </Button> */}
        </div>
        
        {questions.map((question) => (
          <div key={question.id} className="bg-white shadow-md p-4 mb-4 rounded">
            <div className="flex items-center">
              {/* <input
                type="checkbox"
                checked={selectedQuestions.includes(question.id)}
                onChange={() => toggleQuestionSelection(question.id)}
                className="mr-4"
              /> */}
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

      {/* <CreateSurveyModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateSurvey={createSurvey}
      /> */}

      {/* <PersonnelSelectionModal
        isOpen={showPersonnelModal}
        onClose={() => setShowPersonnelModal(false)}
        onAssign={handleAssignSurvey}
        selectedQuestions={selectedQuestions}
      /> */}
    </div>
  )
}

export default Surveys

