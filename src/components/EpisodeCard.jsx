import React from 'react'
import PropTypes from 'prop-types'
import '../css/Card.css'

const EpisodeCard = ({ data }) => {
  return (
    <div className='card'>
      <div className='card_info'>
        <div>
          <strong>{data.name}</strong>
        </div>
        <div className='card_details'>
          <div className='card_value'>
            Air Date: <span>{data.air_date}</span>
          </div>
          <div className='card_value'>
            Episode: <span>{data.episode}</span>
          </div>
          <div className='card_value'>
            Characters: <span>{data.characters.length}</span>
          </div>
        </div>
      </div>
      <button className='card_button'>View More</button>
    </div>
  )
}

EpisodeCard.propTypes = {
  data: PropTypes.shape({
    air_date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    episode: PropTypes.string.isRequired,
    characters: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
}

export default EpisodeCard
