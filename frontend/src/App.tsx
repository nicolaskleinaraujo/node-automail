// Components
import Welcome from "@/components/Welcome"
import AmazonAuth from "@/components/AmazonAuth"
import KindleEmail from "@/components/KindleEmail"
import EndScreen from "@/components/EndScreen"
import DeleteEmail from "@/components/DeleteEmail"

// Modules
import { useState } from "react"

function App() {
  const [steps, setSteps] = useState(0)

  return (
    <div className="flex justify-center items-center h-screen">
      { steps === 0 && <Welcome setSteps={setSteps} /> }
      { steps === 1 && <AmazonAuth setSteps={setSteps} /> }
      { steps === 2 && <KindleEmail setSteps={setSteps} /> }
      { steps === 3 && <EndScreen /> }
      { steps === 4 && <DeleteEmail setSteps={setSteps} /> }
    </div>
  )
}

export default App
