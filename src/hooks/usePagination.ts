import { useState } from 'react'

interface UsePaginationReturn {
    page: number
    setPage: (value: number) => void
}

const usePagination = (initialPage: number = 1): UsePaginationReturn => {
    const [page, setPage] = useState<number>(initialPage)

    return {
        page,
        setPage,
    }
}

export default usePagination