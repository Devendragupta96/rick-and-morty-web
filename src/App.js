import React, { createContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Characters from './components/Characters'
import Locations from './components/Locations'
import Episodes from './components/Episodes'
import Profile from './components/Profile'

export const UserContext = createContext()

function App() {
  const [userData, setUserData] = useState([])
  const [originalUserData, setOriginalUserData] = useState([])

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=1`)
    const data = await response.json()
    setUserData(data.results)
    setOriginalUserData(data.results)
  }

  return (
    <UserContext.Provider value={{ userData, setUserData, originalUserData }}>
      <Router>
        <div className='App'>
          <Routes>
            <Route
              exact
              path='/'
              element={
                <>
                  <Header />
                  <Characters />
                </>
              }
            ></Route>
            <Route
              exact
              path='/locations'
              element={
                <>
                  <Header />
                  <Locations />
                </>
              }
            ></Route>
            <Route
              exact
              path='/episodes'
              element={
                <>
                  <Header />
                  <Episodes />
                </>
              }
            ></Route>
            <Route
              exact
              path='/characters/:Id'
              element={
                <>
                  <Header />
                  <Profile />
                </>
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  )
}

export default App
