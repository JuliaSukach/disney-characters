Disney Characters Browsing App
==============================

A React application that allows users to browse Disney characters using the [Disney API](https://disneyapi.dev/). Users can search for characters, view character details, and access bookmarkable links for sharing.

Demo

![App Usage Demo](./public/demo.gif)

Features
--------

### 1\. Home/Search Page

-   **Search Functionality**: Type in the search bar to find Disney characters by name. Results dynamically appear after typing at least one character.

-   **Pagination**: Users can navigate between pages of results if the search yields more than one page of characters.

-   **Loading Indicator**: A loading spinner is displayed while the results are being fetched.

-   **Error Handling**: Displays appropriate error messages if the search fails or no results are found.

### 2\. Character Details Page

-   **Character Information**: Displays detailed information about each character, such as appearances in films, TV shows, games, and park attractions.

-   **Bookmarkable**: Each character's detail page has a unique URL that can be shared.

### 3\. Responsive Design

-   **Mobile and Desktop Friendly**: The app's layout is optimized to ensure a seamless experience on both mobile and desktop devices.

### 4\. URL Bookmarking

-   **Bookmark and Share**: URLs retain the search context (including search term, page, and page size). Users can bookmark their search or share it across devices and see the exact same search results.

### 5\. User Experience Enhancements

-   **Error Handling**: Proper error messages are displayed, such as when there are no characters found or if there are network issues.

-   **Smooth Pagination**: Navigation between pages is straightforward and optimized for quick browsing of results.

Technologies Used
-----------------

-   **React**: The main framework used for building the user interface.

-   **TypeScript**: Adds static typing to JavaScript to improve development efficiency and code quality.

-   **React Router**: Handles navigation between the Home/Search page and Character Detail pages.

-   **Axios**: Used for making API requests to the Disney API.

-   **CSS**: Styles are defined using CSS for the application's responsiveness and user-friendly appearance.

Getting Started
---------------

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or higher recommended)

-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  Clone the repository:

    ```
    git clone <repository-url>
    cd disney-characters-app
    ```

2.  Install dependencies:

    ```
    npm install
    ```

### Running the Application

1.  Start the development server:

    ```
    npm start
    ```

2.  Open your browser and navigate to:

    ```
    http://localhost:3000
    ```

### Running Tests

The application includes unit tests to ensure robustness.

1.  Execute tests:

    ```
    npm test
    ```

    -   The tests are written using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/).

    -   Coverage includes unit tests for the Home page, search functionality, pagination, and error handling.

Project Structure
-----------------

```
disney-characters-app/
|
├── public/                         # Static files
├── src/
│   ├── components/                 # Reusable UI components (PaginationButton, Spinner, etc.)
│   ├── hooks/                      # Custom hooks (usePagination, useCharacterSearch, useUrlParams, useDebounce)
│   ├── pages/                      # Page components (Home, CharacterDetails)
│   ├── services/                   # API service (fetchCharacters)
│   ├── types/                      # TypeScript type definitions
│   ├── utils/                      # Utility functions (e.g., pagination range creation)
│   ├── App.tsx                     # Main application component
│   ├── index.tsx                   # Entry point for the React application
│   └── css/                        # CSS for styling the application
│
├── .gitignore                      # Files to be ignored by Git
├── package.json                    # Project metadata and dependencies
└── README.md                       # Documentation (this file)
```

Key Concepts
------------

### Custom Hooks

The application makes use of several custom hooks to improve modularity:

-   `**usePagination**`: Manages pagination state.

-   `**useCharacterSearch**`: Handles character fetching logic, including loading, results, and error state.

-   `**useUrlParams**`: Handles URL parameters to ensure that searches and pagination are bookmarkable.

-   `**useDebounce**`: Debounces user input to prevent excessive API calls during typing.

### API Service

-   `**apiService.ts**`: Contains the logic for communicating with the Disney API, using `axios` for HTTP requests. It manages API calls, error handling, and transforming response data for use within the app.

Potential Issues
----------------

### API Limitations

-   **Rate Limits**: The Disney API may have rate limits in place, which could restrict the frequency of search requests.

-   **Data Inconsistencies**: Since the application relies on third-party data, there may be discrepancies or missing character information.

### Network Issues

-   **No Internet**: An active internet connection is required to access the API.

-   **Slow Response**: The app has a loading indicator to notify users of delays caused by network latency.

Future Improvements
-------------------

1.  **Caching**: Implement client-side caching using a library like `React Query` to reduce API calls and improve user experience.

2.  **Favorites Feature**: Allow users to mark characters as favorites and save them locally.

3.  **Testing Coverage**: Expand test coverage to include integration tests for the complete user journey.

4.  **Error Handling**: Improve error differentiation (e.g., network vs. server errors) for more specific user messages.

5.  **Improved UI/UX**: Enhance character cards with images and better animations for improved user experience.

Acknowledgements
----------------

-   The [Disney API](https://disneyapi.dev/) for providing the character data.

-   The React community for continuous support and libraries like React Router, Axios, and React Testing Library.

* * * * *