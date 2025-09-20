import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import SurveyPersonnel from './components/CreateUsers'
import Surveys from './components/CreateQuestion'
import CreateSurvey from './components/CreateSurveys'
import SetPassword from './components/SetPassword'
import { supabase } from './lib/supabaseClient'


function App() {
  const [activeTab, setActiveTab] = useState('personnel')

  const [session, setSession] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((event, session) => {
      // Only set session for verified OTP logins
      if (event === 'SIGNED_IN' && session) {
        setSession(session)
      } else if (event === 'SIGNED_OUT') {
        setSession(null)
      }
    })
  }, [])

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
      {session ? (
        <>
          <TopBar setActiveTab={setActiveTab} />
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="lg:ml-64 pt-16 sm:pt-18 md:pt-20 p-2 sm:p-4 md:p-6">
            {renderContent()}
          </main>
        </>
      ) : (
        <SetPassword onPasswordSet={() => setSession(true)} />
      )}
    </div>
  )
}

export default App
