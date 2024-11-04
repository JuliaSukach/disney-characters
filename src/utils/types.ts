export interface Character {
    _id: number
    name: string
    imageUrl: string
    films?: string[]
    tvShows?: string[]
    videoGames?: string[]
    parkAttractions?: string[]
    sourceUrl?: string
}