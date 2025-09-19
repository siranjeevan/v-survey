import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import SurveyPersonnel from './components/CreateUsers'
import Surveys from './components/CreateQuestion'
import CreateSurvey from './components/CreateSurveys'


function App() {
  const [activeTab, setActiveTab] = useState('personnel')

  const renderContent = () => {
    switch (activeTab) {
      case 'Users':
        return <SurveyPersonnel />
      case 'Questions':
        return <Surveys />
      case 'surveys':
        return <CreateSurvey />
      default:
        return <SurveyPersonnel />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar setActiveTab={setActiveTab} />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="lg:ml-64 pt-16 sm:pt-18 md:pt-20 p-2 sm:p-4 md:p-6">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
