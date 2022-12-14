import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { check } from "@core-common/check";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Location tracker</h1>
      <h2>Core common value: {check()}</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + Math.round(Math.random() * 2 + 1))}>
          count random is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
