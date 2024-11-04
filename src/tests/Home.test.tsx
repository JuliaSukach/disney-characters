import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import Home from '../pages/Home'

// Mock axios to avoid real API requests
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Home component', () => {
    beforeEach(() => {
        mockedAxios.get.mockClear() // Clear mock between tests
    })

    test('renders search input', () => {
        const { asFragment } = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )
        const inputElement = screen.getByPlaceholderText(/Type a character name/i)
        expect(inputElement).toBeInTheDocument()
        expect(asFragment()).toMatchSnapshot() // Snapshot of the initial render
    })

    test('updates search term on input change', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )
        const inputElement = screen.getByPlaceholderText(/Type a character name/i) as HTMLInputElement

        // Simulate user typing into the input
        fireEvent.change(inputElement, { target: { value: 'Mickey' } })

        expect(inputElement.value).toBe('Mickey') // Ensure input state updates
    })

    test('displays loading spinner when fetching', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } }) // Mock resolved API response

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )
        const inputElement = screen.getByPlaceholderText(/Type a character name/i)

        // Simulate input change to trigger fetching
        fireEvent.change(inputElement, { target: { value: 'Mickey' } })

        // Assert loading spinner is in the document
        await waitFor(() => {
            expect(screen.getByRole('status')).toBeInTheDocument()
        })

        // Snapshot of loading state
        await waitFor(() => {
            expect(screen.getByRole('status')).toMatchSnapshot()
        })
        
        // Wait for spinner to disappear
        await waitFor(() => {
            expect(screen.queryByRole('status')).not.toBeInTheDocument()
        })
    })

    test('displays search results after fetching data', async () => {
        const mockData = [
            { _id: '1', name: 'Mickey Mouse' },
            { _id: '2', name: 'Donald Duck' }
        ]
        mockedAxios.get.mockResolvedValueOnce({ data: { data: mockData, totalPages: 1 } })

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )
        const inputElement = screen.getByPlaceholderText(/Type a character name/i)

        fireEvent.change(inputElement, { target: { value: 'Mickey' } })

        // Wait for results to be displayed
        await waitFor(() => {
            expect(screen.getByText(/Mickey Mouse/i)).toBeInTheDocument()
            expect(screen.getByText(/Donald Duck/i)).toBeInTheDocument()
        })

        // Snapshot of the populated state
        expect(screen.getByText(/Mickey Mouse/i).parentElement).toMatchSnapshot()
    })

    test('shows error message on fetch error', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network error. Please check your internet connection and try again.')) // Mock API error

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )
        const inputElement = screen.getByPlaceholderText(/Type a character name/i)

        // Simulate input change to trigger API call
        fireEvent.change(inputElement, { target: { value: 'Mickey' } })

        // Assert error message is shown
        await waitFor(() => {
            expect(screen.getByText(/Error fetching Disney characters. Please try again./i)).toBeInTheDocument()
        })

        // Snapshot of the error state
        expect(screen.getByText(/Error fetching Disney characters. Please try again./i)).toMatchSnapshot()
    })

    test('clears results when input is cleared', async () => {
        const mockData = [
            { _id: '1', name: 'Mickey Mouse' }
        ]
        mockedAxios.get.mockResolvedValueOnce({ data: { data: mockData, totalPages: 1 } })

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        const inputElement = screen.getByPlaceholderText(/Type a character name/i)
        fireEvent.change(inputElement, { target: { value: 'Mickey' } })

        await waitFor(() => {
            expect(screen.getByText(/Mickey Mouse/i)).toBeInTheDocument()
        })

        // Clear the input
        fireEvent.change(inputElement, { target: { value: '' } })

        // Assert results are cleared
        await waitFor(() => {
            expect(screen.queryByText(/Mickey Mouse/i)).not.toBeInTheDocument()
        })
    })

    test('retains focus on input after typing', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        const inputElement = screen.getByPlaceholderText(/Type a character name/i)
        inputElement.focus()
        expect(inputElement).toHaveFocus()

        fireEvent.change(inputElement, { target: { value: 'Donald' } })
        expect(inputElement).toHaveFocus() // Ensure input still has focus after change
    })

    test('displays no characters found message', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: { data: [], totalPages: 1 } })

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )
        const inputElement = screen.getByPlaceholderText(/Type a character name/i)

        // Simulate input change to trigger API call
        fireEvent.change(inputElement, { target: { value: 'Unknown' } })

        // Wait for the "No characters found." message to be displayed
        await waitFor(() => {
            expect(screen.getByText(/No characters found./i)).toBeInTheDocument()
        })

        // Snapshot of no results state
        expect(screen.getByText(/No characters found./i)).toMatchSnapshot()
    })
})