import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import '../css/Header.css'
import { UserContext } from '../App'
function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const { setUserData, originalUserData } = useContext(UserContext)

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Function to perform search based on the search query
  const searchUser = () => {
    if (searchQuery === '') {
      setUserData(originalUserData) // Reset to original data if search query is empty
      return
    }
    const filteredUser = originalUserData.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setUserData(filteredUser)
  }

  return (
    <nav className='header'>
      <div className='header_nav'>
        <Link to='/' className='header_link'>
          Characters
        </Link>
        <Link to='/locations' className='header_link'>
          Locations
        </Link>
        <Link to='/episodes' className='header_link'>
          Episodes
        </Link>

        <div className='search_container'>
          <input type='text' placeholder='Search by name' value={searchQuery} onChange={handleSearchChange} className='search_input' />
          <button onClick={searchUser}>Search</button>
        </div>
      </div>
    </nav>
  )
}

export default Header
