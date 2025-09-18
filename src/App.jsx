import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Sidebar2 from './components/AssignedSurveys'
import TopBar from './components/TopBar'
import SurveyPersonnel from './components/SurveyPersonnel'
import AssignedSurveys from './components/AssignedSurveys'
import Surveys from './components/Surveys'


function App() {
  const [activeTab, setActiveTab] = useState('personnel')

  const renderContent = () => {
    switch (activeTab) {
      case 'personnel':
        return <SurveyPersonnel />
      case 'assigned':
        return <AssignedSurveys />
      case 'surveys':
        return <Surveys />
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
      {/* <Sidebar2 activeTab={activeTab} setActiveTab={setActiveTab} /> */}
    </div>
  )
}

export default App
