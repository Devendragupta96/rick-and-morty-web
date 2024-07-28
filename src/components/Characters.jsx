import React, { useState, useEffect, useMemo, useContext } from 'react'
import Card from './Card'
import '../css/Characters.css'
import ReactPaginate from 'react-paginate'
import { UserContext } from '../App'
import Filter from './Filter'

const Characters = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const { userData, setUserData } = useContext(UserContext)
  const cache = useMemo(() => ({}), [])

  useEffect(() => {
    fetchData(currentPage + 1)
  }, [currentPage])

  const fetchData = async (page) => {
    if (cache[page]) {
      setUserData(cache[page].results)
      setPageCount(cache[page].pages)
    } else {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      const data = await response.json()
      setPageCount(data.info.pages)
      setUserData(data.results)
      cache[page] = {
        results: data.results,
        pages: data.info.pages
      }
    }
  }

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected)
  }

  return (
    <div className='container'>
      <h3>Characters</h3>
      <Filter />
      <div className='container_row'>{userData.length > 0 && userData?.map((data) => <Card key={data.id} data={data} />)}</div>
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

export default Characters
