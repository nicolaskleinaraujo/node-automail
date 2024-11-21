// Components
import Welcome from "@/components/Welcome"
import { useState } from "react"

function App() {
  const [steps, setSteps] = useState(0)

  return (
    <div className="flex justify-center items-center h-screen">
      { steps === 0 && <Welcome setSteps={setSteps} /> }
    </div>
  )
}

export default App
