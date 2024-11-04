import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

const useUrlParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    // Extract the initial search term, page, and page size from the URL parameters
    const initialSearchTerm = searchParams.get('q') ?? ''
    const initialPage = parseInt(searchParams.get('page') ?? '1', 10)
    const initialPageSize = parseInt(searchParams.get('pageSize') ?? '50', 10)
    // Memoized function to update the URL parameters without overriding the existing ones
    const updateUrlParams = useCallback((newParams: Record<string, string>) => {
        const updatedParams = new URLSearchParams(searchParams)

        // Update or remove parameters
        Object.keys(newParams).forEach((key) => {
            if (newParams[key] === '') {
                updatedParams.delete(key) // Remove parameter if the value is empty
            } else if (updatedParams.get(key) !== newParams[key]) {
                updatedParams.set(key, newParams[key])
            }
        })

        setSearchParams(updatedParams, { replace: true })
    }, [searchParams, setSearchParams])

    return {
        initialSearchTerm,
        initialPage,
        initialPageSize,
        updateUrlParams,
    }
}

export default useUrlParams