import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

test('renders Home component on default route', () => {
    render(<App />)
    expect(screen.getByPlaceholderText(/Type a character name/i)).toBeInTheDocument()
})
