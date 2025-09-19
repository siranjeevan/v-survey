
const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'Users', label: 'Create Users' },
    { id: 'Questions', label: 'Create Questions' },
    { id: 'surveys', label: 'Create Survey' },
    // { id: 'surveys1', label: 'Surveys' },
    // { id: 'surveys2', label: 'Surveys' }
  ]

  return (
    <div className="hidden lg:block w-64 bg-white shadow-lg h-screen fixed left-0 top-0 pt-20 z-40">
      <nav className="mt-2 sm:mt-4 md:mt-6 lg:mt-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-center lg:justify-start px-1 sm:px-2 md:px-3 lg:px-6 py-2 sm:py-3 text-left hover:bg-gray-50 transition-colors ${
              activeTab === item.id ? 'bg-gray-100 border-r-2 border-black text-black font-medium' : 'text-gray-700'
            }`}
            title={item.label}
          >
            <span className="hidden lg:inline text-xs sm:text-sm md:text-base">{item.label}</span>
            <span className="lg:hidden text-xs sm:text-sm">{item.label.split(' ')[0]}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar