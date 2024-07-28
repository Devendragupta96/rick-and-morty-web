import React, { useState, useEffect, useMemo } from 'react'
import EpisodeCard from './EpisodeCard'
import '../css/Characters.css'
import ReactPaginate from 'react-paginate'

const Episodes = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [cardsData, setCardsData] = useState([])
  const cache = useMemo(() => ({}), [])

  useEffect(() => {
    fetchData(currentPage + 1)
  }, [currentPage])

  const fetchData = async (page) => {
    if (cache[page]) {
      // If data is cached, use it
      setCardsData(cache[page].results)
      setPageCount(cache[page].pages)
    } else {
      const response = await fetch(`https://rickandmortyapi.com/api/episode/?page=${page}`)
      const data = await response.json()
      setPageCount(data.info.pages)
      setCardsData(data.results)
      cache[page] = {
        results: data.results,
        pages: data.info.pages
      }
    }
  }

  // Handle page click for pagination
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected)
  }

  return (
    <div className='container'>
      <h2>Episodes</h2>
      <div className='container_row'>{cardsData.length > 0 && cardsData?.map((data) => <EpisodeCard key={data.id} data={data} />)}</div>
      <div className='container_pagination'>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  )
}

export default Episodes
