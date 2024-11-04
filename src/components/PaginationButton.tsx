import React from 'react'

interface PaginationButtonProps {
    isActive: boolean
    pageNumber: number | string
    onClick: () => void
    isDisabled?: boolean
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ isActive, pageNumber, onClick, isDisabled }) => (
    <button
        className={`pagination-button ${isActive ? 'active' : ''}`}
        onClick={onClick}
        disabled={isDisabled}
        role='button'
        aria-label={`Page ${pageNumber}`} 
    >
        {pageNumber}
    </button>
)

export default PaginationButton