import React from 'react'
import PropTypes from 'prop-types'
import '../css/Card.css'

const LocationCard = ({ data }) => {
  return (
    <div className='card'>
      <div className='card_info'>
        <div>
          <strong>{data.name}</strong>
        </div>
        <div className='card_details'>
          <div className='card_value'>
            Type: <span>{data.type}</span>
          </div>
          <div className='card_value'>
            Dimension: <span>{data.dimension}</span>
          </div>
          <div className='card_value'>
            Residents: <span>{data.residents.length}</span>
          </div>
        </div>
      </div>
      <button className='card_button'>View More</button>
    </div>
  )
}

LocationCard.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dimension: PropTypes.string.isRequired,
    residents: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
}

export default LocationCard
