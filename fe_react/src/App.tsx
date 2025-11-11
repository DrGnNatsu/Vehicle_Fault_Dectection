import useCounter from './zustand/counter'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  const count = useCounter((s) => s.count);
  const inc = useCounter((s) => s.inc);

  return (
    <>
      <h1>Vehicle Fault Detection System</h1>
            <h1>Vite + React</h1>
      <div className="card">
        <button onClick={inc}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Outlet/>
    </>
  )
}

export default App
