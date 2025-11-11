import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import useCounter from "../zustand/counter";

function Home() {
  const count = useCounter((s) => s.count);
  const inc = useCounter((s) => s.inc);

  return (
    <>
      <h1 className="text-3xl font-bold text-red-500">Vehicle Fault Detection System</h1>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
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
    </>
  )
}

export default Home
