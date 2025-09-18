import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RxCross1 } from "react-icons/rx";
import { IoMdMenu } from "react-icons/io";

const Sidebar = () => {
  
  
    const [personnel, setPersonnel] = useState([
      { id: 1, name: 'John Smith', survey: 'Customer Satisfaction', date: '2024-01-15', status: 'Active' },
      { id: 2, name: 'Sarah Johnson', survey: 'Product Feedback', date: '2024-01-14', status: 'In Progress' },
      { id: 3, name: 'Mike Wilson', survey: 'Market Research', date: '2024-01-13', status: 'Completed' }
    ])
  
    const getStatusColor = (status) => {
      switch (status) {
        case 'Active': return 'bg-green-100 text-green-800'
        case 'In Progress': return 'bg-yellow-100 text-yellow-800'
        case 'Completed': return 'bg-red-100 text-red-800'
        default: return 'bg-gray-100 text-gray-800'
      }
    }

  return (
    <div className="lg:w-96 lg:shadow-lg lg:h-screen lg:fixed lg:right-0 lg:top-0 lg:z-40 lg:bg-white lg:overflow-y-auto w-full bg-transparent">
        <div className="lg:p-6 lg:mt-20 p-4 space-y-4">
          <div className="lg:flex lg:items-center lg:justify-center hidden">
            {/* <button className="text-2xl hover:bg-gray-100 p-2 rounded-full transition-colors">
              <RxCross1 />
            </button> */}
            <CardTitle className="text-xl text-black font-semibold flex justify-center">
              Assigned Surveys
            </CardTitle>
            <div className="w-10"></div>
          </div>
          <div className="lg:hidden mb-4">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Assigned Surveys
            </CardTitle>
          </div>
          <CardContent className="p-0">
            <div className="space-y-3">
              {personnel.map((person) => (
                <div key={person.id} className="p-5 border-1 border-black rounded-lg bg-white hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <h4 className="font-medium text-gray-800 text-sm sm:text-base break-words flex-1">
                      {person.name}
                    </h4>
                    <button className="text-[22px]">
                      <IoMdMenu />
                    </button>
                  </div>
                  <p className="text-xs sm:text-ss text-gray-600 mb-3 break-words">
                    {person.survey}
                  </p>
                  <p className="text-xs text-black">
                    Created: {person.date}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </div>
    </div>
  )
}

export default Sidebar
