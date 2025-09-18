import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RxCross1 } from "react-icons/rx"

const PersonnelSelectionModal = ({ isOpen, onClose, onAssign, selectedQuestions }) => {
  const [personnel, setPersonnel] = useState([])
  const [selectedPersonnel, setSelectedPersonnel] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectAll, setSelectAll] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchPersonnel()
    }
  }, [isOpen])

  const fetchPersonnel = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_Base_URL}/GetUser`)
      if (response.ok) {
        const data = await response.json()
        setPersonnel(data)
      }
    } catch (error) {
      console.error('Error fetching personnel:', error)
      setPersonnel([
        { user_id: 1, first_name: 'John', last_name: 'Smith', email: 'john@example.com' },
        { user_id: 2, first_name: 'Sarah', last_name: 'Johnson', email: 'sarah@example.com' }
      ])
    }
  }

  const togglePersonnelSelection = (userId) => {
    setSelectedPersonnel(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPersonnel([])
    } else {
      setSelectedPersonnel(filteredPersonnel.map(p => p.user_id))
    }
    setSelectAll(!selectAll)
  }

  const handleAssign = () => {
    onAssign(selectedQuestions, selectedPersonnel)
    setSelectedPersonnel([])
    setSelectAll(false)
    setSearchTerm("")
  }

  const filteredPersonnel = personnel.filter(person => 
    `${person.first_name} ${person.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select Personnel</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <RxCross1 size={20} />
          </button>
        </div>

        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search personnel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <span className="font-medium">Select All</span>
          </label>
        </div>

        <div className="max-h-60 overflow-y-auto space-y-2">
          {filteredPersonnel.map((person) => (
            <div key={person.user_id} className="border p-3 rounded hover:bg-gray-50">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedPersonnel.includes(person.user_id)}
                  onChange={() => togglePersonnelSelection(person.user_id)}
                />
                <div>
                  <p className="font-medium">{person.first_name} {person.last_name}</p>
                  <p className="text-sm text-gray-500">{person.email}</p>
                </div>
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button 
            onClick={onClose}
            variant="outline"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAssign}
            disabled={selectedPersonnel.length === 0}
            className="bg-black text-white"
          >
            Assign Survey ({selectedPersonnel.length})
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PersonnelSelectionModal