import React from 'react'

interface ErrorMessageProps {
    message: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <p className='error-message' role='alert' style={{ color: 'red' }}>
            {message}
        </p>
    )
}

export default ErrorMessage