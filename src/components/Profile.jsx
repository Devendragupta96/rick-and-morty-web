import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../css/Profile.css'

const Profile = () => {
  const { Id } = useParams() // Extracting Id from URL parameters
  const [character, setCharacter] = useState(null)
  const [origin, setOrigin] = useState(null)
  const [location, setLocation] = useState(null)
  const [episodeNames, setEpisodeNames] = useState([])

  useEffect(() => {
    fetchCharacter()
  }, [Id])

  useEffect(() => {
    if (character) {
      fetchLocation(character.location.name)
      fetchOrigin(character.origin.name)
      fetchEpisodes(character.episode)
    }
  }, [character])

  const fetchCharacter = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${Id}`)
    const data = await response.json()
    setCharacter(data)
  }

  const fetchLocation = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/location/?name=${character.location.name}`)
    const data = await response.json()
    setLocation(data.results[0])
  }

  const fetchOrigin = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/location/?name=${character.origin.name}`)
    const data = await response.json()
    setOrigin(data.results[0])
  }

  // Fetch episode data from API
  const fetchEpisodes = async (episodeUrls) => {
    const episodePromises = episodeUrls.map((url) => fetch(url).then((res) => res.json()))
    const episodes = await Promise.all(episodePromises)
    const episodeNames = episodes.map((episode) => episode.name)
    setEpisodeNames(episodeNames)
  }

  // Display loading message while data is being fetched
  if (!character) {
    return <p>Loading...</p>
  }

  return (
    <div className='profile'>
      <img src={character.image} alt={character.name} className='profile_image' />
      <div className='profile_info'>
        <h2>{character.name}</h2>
        <p>
          <strong>Species:</strong> {character.species}
        </p>
        <p>
          <strong>Gender:</strong> {character.gender}
        </p>
        <p>
          <strong>Status:</strong> {character.status}
        </p>
        <div className='profile_location'>
          <h3>Origin</h3>
          <p>
            <strong>Name:</strong> {character.origin.name}
          </p>
          <p>
            <strong>Dimension:</strong> {origin?.dimension || 'Unknown'}
          </p>
          <p>
            <strong>Residents:</strong> {origin?.residents ? origin?.residents.length : 'Unknown'}
          </p>
        </div>
        <div className='profile_location'>
          <h3>Current Location</h3>
          <p>
            <strong>Name:</strong> {character.location.name}
          </p>
          <p>
            <strong>Dimension:</strong> {location?.dimension || 'Unknown'}
          </p>
          <p>
            <strong>Residents:</strong> {location?.residents ? location?.residents.length : 'Unknown'}
          </p>
        </div>
        <div className='profile_episodes'>
          <h3>Episodes</h3>
          <ul>
            {episodeNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile
