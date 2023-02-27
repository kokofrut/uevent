import { useState } from 'react'
import reactLogo from './assets/react.svg'
import MainPage from './components/containers/mainpage/mainpage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // localStorage.removeItem('currEvent')
  return (
    <div className="App">
		  <MainPage />
    </div>
  )
}

export default App
