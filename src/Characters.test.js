import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Characters from './components/Characters'
import { UserContext } from './App'
import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()

const mockUserData = [
  {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    gender: 'Male',
    species: 'Human',
    status: 'Alive',
    location: { name: 'Earth (Replacement Dimension)' },
    type: '',
    episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2']
  },
]

const mockResponse = {
  info: { pages: 1 },
  results: mockUserData
}

describe('Characters Component', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  test('displays pagination', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse))
    const setUserData = jest.fn()

    render(
      <UserContext.Provider value={{ userData: [], setUserData }}>
        <Characters />
      </UserContext.Provider>
    )

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))

    expect(screen.getByText('Next')).toBeInTheDocument()
    expect(screen.getByText('Previous')).toBeInTheDocument()
  })

  // test('fetches and displays characters', async () => {
  //   fetch.mockResponseOnce(JSON.stringify(mockResponse))
  //   const setUserData = jest.fn()
  //   const userData = []

  //   render(
  //     <UserContext.Provider value={{ userData, setUserData }}>
  //       <Characters />
  //     </UserContext.Provider>
  //   )

  //   await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))

  //   const characterName = await screen.findByText('Rick Sanchez')
  //   expect(characterName).toBeInTheDocument()
  // })

  
})
