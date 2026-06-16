# CineRandom: Discover Your Next Favorite Movie

CineRandom is a simple web application that helps you discover highly-rated movies with a single click. It fetches movie data from The Movie Database (TMDB) API and caches it using Firebase Firestore to provide quick recommendations.

Live Website : https://cinerandom-movie-recommender.netlify.app/
## Features

*   **Random Movie Generation:** Get a new movie recommendation instantly.
*   **Detailed Movie Information:** View title, rating, overview, release date, runtime, genres, and top cast.
*   **Trailer Links:** Easily watch movie trailers on YouTube.
*   **Local Cache Statistics:** See how many movies are cached for faster retrieval.
*   **Responsive Design:** Works well on both desktop and mobile devices.

## Technologies Used

*   **Frontend:**
    *   HTML5
    *   CSS (Tailwind CSS via CDN, Custom CSS)
    *   JavaScript (ES Modules)
    *   Google Fonts (Poppins)
    *   Font Awesome (Icons)
*   **APIs:**
    *   The Movie Database (TMDB) API for movie data.
*   **Backend/Database (Client-side usage):**
    *   Firebase (Firestore) for caching movie details.

## Setup and Deployment

### API Keys
This application requires API keys for TMDB and Firebase. For security, these should ideally be managed as environment variables, especially in production deployments like Netlify.

*   **TMDB API Key:** Obtain one from [TMDB Developers](https://www.themoviedb.org/documentation/api/v3).
*   **Firebase Configuration:** Set up a Firebase project and get your configuration details from your project settings. Ensure you have Firestore enabled.

### Local Development

1.  Clone the repository:
    ```bash
    git clone https://github.com/YOUR_USERNAME/cine-random-app.git
    cd cine-random-app
    ```
2.  Open `index.html` in your web browser.
3.  **_Important:_** Replace the placeholder API keys in `index.html` with your actual keys if running locally without a build process.

### Deployment to Netlify

This project is configured for seamless deployment on Netlify using environment variables.

1.  **Fork/Clone** this repository.
2.  **Connect your GitHub repository** to Netlify.
3.  **Configure Environment Variables** in Netlify under `Site settings > Build & deploy > Environment`.
    *   `VITE_TMDB_API_KEY`: Your TMDB API Key
    *   `VITE_FIREBASE_API_KEY`: Your Firebase `apiKey`
    *   `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase `authDomain`
    *   `VITE_FIREBASE_PROJECT_ID`: Your Firebase `projectId`
    *   `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase `storageBucket`
    *   `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase `messagingSenderId`
    *   `VITE_FIREBASE_APP_ID`: Your Firebase `appId`
    *   `VITE_FIREBASE_MEASUREMENT_ID`: Your Firebase `measurementId` (optional, for analytics)
4.  Netlify will automatically build and deploy your site, injecting these variables.

## Contributing

Feel free to fork the repository, make improvements, and submit pull requests!

## License

This project is open-sourced under the MIT License.