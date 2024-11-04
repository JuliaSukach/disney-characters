import { useState } from 'react'
import { fetchCharacters } from '../services/apiService'
import { Character } from '../utils/types'

interface UseCharacterSearchReturn {
    results: Character[]
    loading: boolean
    error: string
    fetchCharactersForSearchTerm: (searchTerm: string, page: number, pageSize: number) => Promise<{ data: Character[]; totalPages: number }>
    resetResults: () => void
    setError: (message: string) => void
}

const useCharacterSearch = (): UseCharacterSearchReturn => {
    const [results, setResults] = useState<Character[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const fetchCharactersForSearchTerm = async (searchTerm: string, page: number, pageSize: number): Promise<{ data: Character[]; totalPages: number }> => {
        setLoading(true)
        setError('')
        try {
            const response = await fetchCharacters(searchTerm, page, pageSize)
            const { data, totalPages } = response
            if (data.length === 0) {
                setError('No characters found.')
            } else {
                setResults(data)
            }
            return { data, totalPages }
        } catch (err: any) {
            setError('Error fetching Disney characters. Please try again.')
            return { data: [], totalPages: 1 } 
        } finally {
            setLoading(false)
        }
    }

    const resetResults = () => {
        setResults([])
        setError('') // Clear any previous errors
    }

    return {
        results,
        loading,
        error,
        fetchCharactersForSearchTerm,
        resetResults,
        setError,
    }
}

export default useCharacterSearch
