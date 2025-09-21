import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Sidebar from "./AssignedSurveys"

const Surveys = () => {
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
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([''])
  
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

  return (
    <div className="flex flex-col lg:flex-row gap-4 md:gap-6 xl:px-10">
      <div className="flex-1 min-w-0">
        <div className="mb-4 md:mb-6">
          <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium">Create Survey Questionnaire</h1>
          <h1 className="text-sm md:text-base lg:text-lg text-gray-400 font-extralight mt-1">Manage and create questionnaires</h1>
        </div>
        <div className="bg-white shadow-2xl p-4 md:p-6">
          <label className="block text-xs md:text-sm font-bold text-black mb-2">QUESTION</label>
          <Input
            type="text"
            placeholder="Enter your survey question here"
            required
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="rounded-[5px] border-gray-400 p-3 text-sm w-full"
          />
          
          <label className="block text-xs md:text-sm font-bold text-black mb-2 mt-5">RESPONSE TYPE</label>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <select
              className="flex-1 md:max-w-xs p-3 border text-sm rounded-[5px] border-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
              required
              value={responseType}
              onChange={(e) => setResponseType(e.target.value)}
            >
              <option value="">Select response type</option>
              {responseTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>

            <button 
              onClick={addQuestion}
              className="bg-black text-white px-4 py-3 rounded-[8px] text-sm whitespace-nowrap"
            >
              + Add Question
            </button>
          </div>

          {responseType === 'Multiple choice' && (
            <div className="mt-4">
              <label className="block text-xs md:text-sm font-bold text-black mb-2">MULTIPLE CHOICE OPTIONS</label>
              {multipleChoiceOptions.map((option, index) => (
                <div key={index} className="flex items-center mb-2 gap-2">
                  <input
                    type="checkbox"
                    className="flex-shrink-0"
                    disabled
                  />
                  <Input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 rounded-[5px] border-gray-400 p-2 text-sm"
                  />
                </div>
              ))}
              <Button onClick={addOption} className="mt-2 text-sm">+ Add Option</Button>
            </div>
          )}
        </div>

        <div className="mt-4 md:mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base md:text-lg lg:text-xl font-semibold">Available Questions</h2>
          </div>
          
          {questions.map((question) => (
            <div key={question.id} className="bg-white shadow-md p-3 md:p-4 mb-3 md:mb-4 rounded">
              <div className="flex items-start">
                <div className="flex-1">
                  <p className="font-medium text-sm break-words">{question.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{question.type}</p>
                  {question.options && question.options.length > 0 && (
                    <div className="ml-4 mt-2">
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input type="checkbox" disabled className="flex-shrink-0" />
                          <span className="text-xs break-words">{option}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-full lg:w-80 lg:flex-shrink-0">
        <Sidebar />
      </div>
    </div>
  )
}

export default Surveys

