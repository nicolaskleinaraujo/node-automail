// Components
import Welcome from "@/components/Welcome"
import AmazonAuth from "@/components/AmazonAuth"
import KindleEmail from "@/components/KindleEmail"
import EndScreen from "@/components/EndScreen"

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
    </div>
  )
}

export default App
