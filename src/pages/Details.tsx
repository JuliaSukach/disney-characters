import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../css/details.css'
import ErrorMessage from '../components/ErrorMessage'
import Spinner from '../components/Spinner'

const Details = () => {
    // Define the Character interface
    interface Character {
        _id: number
        name: string
        imageUrl: string
        films?: string[]
        tvShows?: string[]
        videoGames?: string[]
        parkAttractions?: string[]
        sourceUrl?: string
    }
    const { id } = useParams<{ id: string }>() // Get character ID from URL
    const [character, setCharacter] = useState<Character | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Function to validate response structure
    const isValidCharacterResponse = (response: any) => {
        return response?.data?.data && response?.data?.info?.count > 0
    }

    useEffect(() => {
        // Fetch character details using the ID from the URL
        const fetchCharacter = async () => {
            setLoading(true)
            setError('')
            try {
                const response = await axios.get(`https://api.disneyapi.dev/character/${id}`)
                if (isValidCharacterResponse(response)) {
                    setCharacter(response.data.data)
                } else {
                    setError('Character not found.')
                }
            } catch (error) {
                setError('Error fetching character details. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchCharacter()
    }, [id])

    if (loading) return <Spinner />
    if (error) return <ErrorMessage message={error} />

    return (
        <div className='details-container'>
            {character ? (
                <>
                    <div className='details-image-container'>
                        <img className="details-image" src={character.imageUrl  || '/images/character.png'} alt={character.name} />
                    </div>
                    <div className='details-content'>
                        <h1 className='details-name'>{character.name}</h1>

                        {/* Films Section */}
                        <h3>Films</h3>
                        {character.films && character.films.length > 0 ? (
                            <ul>
                                {character.films.map((film, index) => (
                                    <li key={index}>{film}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No films available.</p>
                        )}

                        {/* TV Shows Section */}
                        <h3>TV Shows</h3>
                        {character.tvShows && character.tvShows.length > 0 ? (
                            <ul>
                                {character.tvShows.map((show, index) => (
                                    <li key={index}>{show}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No TV shows available.</p>
                        )}

                        {/* Video Games Section */}
                        <h3>Video Games</h3>
                        {character.videoGames && character.videoGames.length > 0 ? (
                            <ul>
                                {character.videoGames.map((game, index) => (
                                    <li key={index}>{game}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No video games available.</p>
                        )}

                        {/* Park Attractions Section */}
                        <h3>Park Attractions</h3>
                        {character.parkAttractions && character.parkAttractions.length > 0 ? (
                            <ul>
                                {character.parkAttractions.map((attraction, index) => (
                                    <li key={index}>{attraction}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No park attractions available.</p>
                        )}

                        {/* External Source Link */}
                        {character.sourceUrl ? (
                            <div className='learn-more-section'>
                                <h3>Learn More</h3>
                                <a href={character.sourceUrl} target='_blank' rel='noopener noreferrer'>
                                    Visit Disney Fandom for more details
                                </a>
                            </div>
                        ) : (
                            <p>No external resources available.</p>
                        )}
                    </div>
                </>
            ) : (
                <p className='error-message'>No character details available.</p>
            )}
        </div>
    )
}

export default Details