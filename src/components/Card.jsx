import React from 'react'
import PropTypes from 'prop-types'
import '../css/Card.css'
import { Link } from 'react-router-dom'

const Card = ({ data }) => {
  return (
    <div className='card'>
      <div className='card_info'>
        <img src={data.image} alt='profile' />
        <div>
          <strong>{data.name}</strong>
        </div>
        <div className='card_details'>
          <div className='card_value'>
            Gender: <span>{data.gender}</span>
          </div>
          <div className='card_value'>
            Species: <span>{data.species}</span>
          </div>
          <div className='card_value'>
            Status: <span>{data.status}</span>
          </div>
          <div className='card_value'>
            Location: <span>{data.location.name}</span>
          </div>
          <div className='card_value'>
            Type: <span>{data.type || 'Unknown'}</span>
          </div>
          <div className='card_value'>
            Episodes: <span>{data.episode.length}</span>
          </div>
        </div>
      </div>
      <Link to={`/characters/${data.id}`}>
        <button className='card_button'>View More</button>
      </Link>
    </div>
  )
}

Card.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    location: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    type: PropTypes.string,
    episode: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
}

export default Card
