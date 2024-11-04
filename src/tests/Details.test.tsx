import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Details from '../pages/Details'

// Mock axios to avoid making real API requests
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Details Component', () => {
    const characterId = '123'
    const characterData = {
        _id: 123,
        name: 'Mickey Mouse',
        imageUrl: 'https://example.com/mickey.png',
        films: ['Steamboat Willie'],
        tvShows: ['The Mickey Mouse Clubhouse'],
        videoGames: ['Kingdom Hearts'],
        sourceUrl: 'https://disney.fandom.com/wiki/Mickey_Mouse',
    }

    beforeEach(() => {
        mockedAxios.get.mockClear()
    })

    test('shows loading spinner when fetching data', async () => {
        mockedAxios.get.mockResolvedValueOnce(new Promise(() => {})) // Simulate loading state

        const { asFragment } = render(
            <MemoryRouter initialEntries={[`/details/${characterId}`]}>
                <Routes>
                    <Route path='/details/:id' element={<Details />} />
                </Routes>
            </MemoryRouter>
        )

        // Assert loading spinner is displayed
        await waitFor(() => {
            expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument()
        })
        // Take snapshot of the loading state
        expect(asFragment()).toMatchSnapshot()
    })

    test('renders character details successfully', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { data: characterData, info: { count: 1 } },
        })

        const { asFragment } = render(
            <MemoryRouter initialEntries={[`/details/${characterId}`]}>
                <Routes>
                    <Route path='/details/:id' element={<Details />} />
                </Routes>
            </MemoryRouter>
        )

        // Wait for the character details to load
        await waitFor(() => {
            expect(screen.getByText(characterData.name)).toBeInTheDocument()
        })

        // Assert all key data fields are present
        expect(screen.getByAltText(characterData.name)).toBeInTheDocument()
        expect(screen.getByText('Films')).toBeInTheDocument()
        expect(screen.getByText('Steamboat Willie')).toBeInTheDocument()
        expect(screen.getByText('TV Shows')).toBeInTheDocument()
        expect(screen.getByText('The Mickey Mouse Clubhouse')).toBeInTheDocument()
        expect(screen.getByText('Video Games')).toBeInTheDocument()
        expect(screen.getByText('Kingdom Hearts')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Visit Disney Fandom for more details/i })).toBeInTheDocument()

        // Take snapshot of the rendered character details page
        expect(asFragment()).toMatchSnapshot()
    })

    test('displays error message if character not found', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { data: null, info: { count: 0 } },
        })

        const { asFragment } = render(
            <MemoryRouter initialEntries={[`/details/${characterId}`]}>
                <Routes>
                    <Route path='/details/:id' element={<Details />} />
                </Routes>
            </MemoryRouter>
        )

        // Wait for the "Character not found" message
        await waitFor(() => {
            expect(screen.getByText(/Character not found./i)).toBeInTheDocument()
        })

        // Snapshot of the not found state
        expect(asFragment()).toMatchSnapshot()
    })

    test('displays error message on fetch failure', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network error'))

        const { asFragment } = render(
            <MemoryRouter initialEntries={[`/details/${characterId}`]}>
                <Routes>
                    <Route path='/details/:id' element={<Details />} />
                </Routes>
            </MemoryRouter>
        )

        // Wait for the error message to be displayed
        await waitFor(() => {
            expect(screen.getByText(/Error fetching character details. Please try again later./i)).toBeInTheDocument()
        })

        // Snapshot of the error state
        expect(asFragment()).toMatchSnapshot()
    })

    test('displays default image when character image is not available', async () => {
        const characterWithoutImage = { ...characterData, imageUrl: undefined }
        mockedAxios.get.mockResolvedValueOnce({
            data: { data: characterWithoutImage, info: { count: 1 } },
        })

        render(
            <MemoryRouter initialEntries={[`/details/${characterId}`]}>
                <Routes>
                    <Route path='/details/:id' element={<Details />} />
                </Routes>
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByAltText(characterWithoutImage.name)).toBeInTheDocument()
        })

        // Verify the fallback image is used when imageUrl is not available
        const imgElement = screen.getByAltText(characterWithoutImage.name) as HTMLImageElement
        expect(imgElement.src).toContain('/images/character.png')

        // Snapshot of fallback image scenario
        expect(imgElement).toMatchSnapshot()
    })
})
