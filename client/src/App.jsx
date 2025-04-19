import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InvestmentForm from './components/InvestmentForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
      <InvestmentForm />
    </div>
  )
}

export default App
