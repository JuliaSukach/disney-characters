import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'
import usePagination from '../hooks/usePagination'
import useUrlParams from '../hooks/useUrlParams'
import useCharacterSearch from '../hooks/useCharacterSearch'
import PaginationButton from '../components/PaginationButton'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import { createPaginationRange } from '../utils/pagination'
import '../css/spinner.css'
import '../css/home.css'

const Home: React.FC = () => {
    // Custom hook for URL parameters
    const { initialSearchTerm, initialPage, initialPageSize, updateUrlParams } = useUrlParams()

    // State Management
    const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm)
    const [totalPages, setTotalPages] = useState<number>(1)

    // Use custom pagination hook
    const { page, setPage } = usePagination(initialPage)

    // Debounce the search term so API calls are not made on every keystroke
    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    // Custom hook for character search logic
    const { results, loading, error, fetchCharactersForSearchTerm, resetResults, setError } = useCharacterSearch()


    // Fetch characters whenever debounced search term or page changes
    useEffect(() => {
        if (debouncedSearchTerm.length < 1) {
            resetResults()
            setTotalPages(1)
            setPage(1)
            setError('')
            return
        }

        // Function to fetch characters
        const getCharacters = async () => {
            resetResults()
            setError('')
            try {
                const { totalPages: fetchedTotalPages } = await fetchCharactersForSearchTerm(debouncedSearchTerm, page, initialPageSize)
                // Set total pages
                setTotalPages(fetchedTotalPages)
            } catch (err) {
                console.error('Failed to fetch characters:', err)
            }
        }

        getCharacters()
    }, [debouncedSearchTerm, page])

    // Use another useEffect for updating URL params when relevant state changes
    useEffect(() => {
        if (debouncedSearchTerm.length < 1) {
            updateUrlParams({ q: '', page: '', pageSize: '' })
        } else {
            updateUrlParams({ q: debouncedSearchTerm, page: page.toString(), pageSize: initialPageSize.toString() })
        }
    }, [debouncedSearchTerm, page, updateUrlParams])

    // Handle input changes and update URL query
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)
        setPage(1)

        if (value === '') {
            setSearchTerm('')
        }
    }

    // Handle page number click
    const handlePageClick = (pageNumber: number) => {
        if (pageNumber !== page) {
            setPage(pageNumber)
        }
    }

    return (
        <div className='home-container'>
            <h1>Search Disney Characters</h1>
            <input
                className='search-input'
                type='text'
                value={searchTerm}
                onChange={handleInputChange}
                placeholder='Type a character name'
                aria-label='Search for Disney characters'
            />
            {loading && <Spinner />}
            {error && <ErrorMessage message={error} />}
            {!loading &&(
                <ul className='search-results'>
                {results.map((character) => (
                    <li key={character._id} id={`character-${character._id}`} className='search-result-item' tabIndex={0}>
                        <Link to={`/details/${character._id}`}>{character.name}</Link>
                    </li>
                ))}
            </ul>
            )}
            {totalPages > 1 && !loading && results.length > 0 && (
                <div className='pagination'>
                    {createPaginationRange(page, totalPages).map((pageItem: number | string) => (
                        <PaginationButton
                            key={pageItem}
                            pageNumber={pageItem}
                            isActive={page === pageItem}
                            onClick={() => typeof pageItem === 'number' && handlePageClick(pageItem)}
                            isDisabled={pageItem === '...'}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home