import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import '../css/Filter.css'

const Filter = () => {
  // Using useContext to access originalUserData and setUserData from UserContext
  const { originalUserData, setUserData } = useContext(UserContext)
  // Initial state for filters
  const [filters, setFilters] = useState({
    status: '',
    location: '',
    episode: '',
    gender: '',
    species: '',
    type: ''
  })

  // Function to handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }))
  }

  const filterByStatus = (data, status) => {
    return data.filter((user) => user.status?.toLowerCase().includes(status.toLowerCase()))
  }

  const filterByLocation = (data, location) => {
    return data.filter((user) => user.location?.name?.toLowerCase().includes(location.toLowerCase()))
  }

  const filterByEpisode = (data, episode) => {
    return data.filter((user) => user.episode.length === +episode)
  }

  const filterByGender = (data, gender) => {
    return data.filter((user) => user.gender?.toLowerCase().includes(gender.toLowerCase()))
  }

  const filterBySpecies = (data, species) => {
    return data.filter((user) => user.species?.toLowerCase().includes(species.toLowerCase()))
  }

  const filterByType = (data, type) => {
    if (type.toLowerCase() === 'unknown') {
      return data.filter((user) => user.type === '')
    }
    return data.filter((user) => user.type?.toLowerCase().includes(type.toLowerCase()))
  }

  // Function to apply all filters
  const applyFilters = () => {
    let filteredData = originalUserData

    if (filters.status) {
      filteredData = filterByStatus(filteredData, filters.status)
    }

    if (filters.location) {
      filteredData = filterByLocation(filteredData, filters.location)
    }

    if (filters.episode) {
      filteredData = filterByEpisode(filteredData, filters.episode)
    }

    if (filters.gender) {
      filteredData = filterByGender(filteredData, filters.gender)
    }

    if (filters.species) {
      filteredData = filterBySpecies(filteredData, filters.species)
    }

    if (filters.type) {
      filteredData = filterByType(filteredData, filters.type)
    }

    setUserData(filteredData)
  }

  // Function to reset all filters
  const resetFilters = () => {
    setFilters({
      status: '',
      location: '',
      episode: '',
      gender: '',
      species: '',
      type: ''
    })
    setUserData(originalUserData)
  }

  return (
    <div className='filter-container'>
      <div className='filter-group'>
        <label>Status</label>
        <input type='text' name='status' value={filters.status} onChange={handleFilterChange} />
      </div>
      <div className='filter-group'>
        <label>Location</label>
        <input type='text' name='location' value={filters.location} onChange={handleFilterChange} />
      </div>
      <div className='filter-group'>
        <label>Total Episode</label>
        <input type='text' name='episode' value={filters.episode} onChange={handleFilterChange} />
      </div>
      <div className='filter-group'>
        <label>Gender</label>
        <input type='text' name='gender' value={filters.gender} onChange={handleFilterChange} />
      </div>
      <div className='filter-group'>
        <label>Species</label>
        <input type='text' name='species' value={filters.species} onChange={handleFilterChange} />
      </div>
      <div className='filter-group'>
        <label>Type</label>
        <input type='text' name='type' value={filters.type} onChange={handleFilterChange} />
      </div>
      <div className='filter-buttons'>
        <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>
    </div>
  )
}

export default Filter
