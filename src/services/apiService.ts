import axios from 'axios'

// Define the base URL of the Disney API
const API_BASE_URL = 'https://api.disneyapi.dev/character'

// Function to fetch Disney characters based on a search term and page number
export const fetchCharacters = async (searchTerm: string, page: number = 1, pageSize: number = 50) => {
    try {
        const response = await axios.get(`${API_BASE_URL}?name=${searchTerm}&page=${page}&pageSize=${pageSize}`)
        const responseData = response.data.data
        const totalPages = response.data.info?.totalPages ?? 1
        return {
            data: Array.isArray(responseData) ? responseData : [responseData],
            totalPages,
        }
    } catch (error: any) {
        if (!error.response) {
            throw new Error('Network error. Please check your internet connection and try again.')
        } else if (error.response.status >= 500) {
            throw new Error('Server error. Please try again later.')
        } else {
            throw new Error('Error fetching characters. Please try again.')
        }
    }
}