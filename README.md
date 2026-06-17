# CineRandom: Discover Your Next Favorite Movie or Series

[![Netlify Status](https://api.netlify.com/api/v1/badges/22d57d77-a8a2-4a7b-a010-388f61405e32/deploy-status)](https://app.netlify.com/sites/cinerandom-movie-recommender/deploys)

CineRandom is a dynamic web application designed to help you effortlessly discover your next favorite movie or TV series. Whether you're in the mood for a film, a show, or just want a surprise, CineRandom uses The Movie Database (TMDB) API to fetch personalized recommendations, enhanced by a robust Firebase Firestore caching system for blazing-fast performance and an engaging user experience.

**Live Website:** [https://cinerandom-movie-recommender.netlify.app/](https://cinerandom-movie-recommender/deploys)

## ✨ Features

*   **Intelligent Recommendations:** Get instant movie or TV series suggestions with a single click.
*   **Advanced Filtering:** Tailor your search with customizable filters:
    *   **Media Type Toggle:** Switch between Movies and TV Series.
    *   **Genre Selection:** Choose from a wide range of genres.
    *   **Minimum Rating:** Set a threshold for the audience score (TMDB rating).
    *   **Quantity Control:** Decide how many recommendations you want to see.
    *   **Year Range:** Filter by release year (min/max).
*   **Personalized Suggestions:** The app learns from your "liked" items (stored anonymously) to subtly influence future recommendations, creating a more custom discovery experience.
*   **Comprehensive Details Modal:** Click on any recommendation to view:
    *   Title, poster, and TMDB rating.
    *   In-depth overview and top cast.
    *   Release date and runtime (for movies) or episode runtime (for TV series).
    *   Direct links to YouTube trailers, TMDB, and IMDb pages.
    *   "Like" button to save preferences for personalization.
    *   "Copy Title" button for quick sharing.
*   **Recommendation History:** Keep track of all your past discoveries in an immersive, slide-out sidebar, allowing you to revisit items you've seen.
*   **Optimized Performance:** Leverages Firebase Firestore for intelligent caching of TMDB API responses, significantly reducing load times for repeated queries and enhancing the user experience.
*   **Responsive Design:** A clean, intuitive, and fully responsive user interface ensures a seamless experience across all devices, from desktops to mobile phones.

## 🚀 Technologies Used

*   **Frontend:**
    *   HTML5
    *   CSS3 (with Tailwind CSS for utility-first styling)
    *   JavaScript (ES6+)
*   **API Integration:**
    *   **The Movie Database (TMDB) API:** For movie/TV series data, images, trailers, and cast information.
*   **Backend/Services:**
    *   **Firebase Firestore:** Used for:
        *   Caching TMDB API responses to improve performance and reduce API calls.
        *   Storing anonymous user "likes" for basic personalization.
    *   **Netlify:** For continuous deployment and hosting.

## 🎬 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following installed:

*   Node.js and npm (or yarn)
*   A TMDB API Key
*   A Firebase Project with Firestore enabled

### 1. Clone the repository

```bash
git clone https://github.com/sOuL2000s/CineRandom-Movie-Recommender.git
cd CineRandom-Movie-Recommender
```

### 2. Install Dependencies

This project uses modern JavaScript features and utility CSS (Tailwind CSS), which often involves a build step for development. While the provided structure suggests a direct browser import for `firebase-config.js`, a typical setup might involve a bundler like Vite. Assuming a direct browser setup for simplicity:

No explicit `npm install` for frontend libraries if they are imported via CDN, but if you have a `package.json` for Tailwind JIT or other build tools, you'd run:

```bash
# If you have a package.json for dev dependencies like Tailwind CLI
npm install
# Or
yarn install
```

### 3. Environment Variables

Create a `firebase-config.js` file in the root of your project (or a similar location where it can be directly imported) and populate it with your Firebase project configuration. This file should contain your TMDB API key as well.

```javascript
// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY", // Get this from your Firebase project settings
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firebase instance and Firestore DB
export { app, db };

// Also define your TMDB API key here or in another config file
export const TMDB_API_KEY = "YOUR_TMDB_API_KEY"; // Get this from your TMDB API dashboard
```
**Important:** For production deployment, you would typically use environment variables (e.g., `process.env.VITE_TMDB_API_KEY` if using Vite, or Netlify Environment Variables) to keep sensitive keys out of your public codebase. For local development, hardcoding in a `.gitignore`d file like `firebase-config.js` is a common practice, but ensure it's not committed.

### 4. Run the application

Since this is a client-side only application, you can simply open `index.html` in your web browser.

For development, a simple local server is recommended to avoid CORS issues and for better workflow:

```bash
# If you have http-server installed globally
http-server .
```
Or, use a Live Server extension in your VS Code editor.

## 📁 Project Structure

```
cinerandom/
├── index.html                  # Main HTML file
├── style.css                   # General styling
├── tailwind.css                # Tailwind CSS output (pre-generated or via build step)
├── modal.css                   # Specific styles for the movie/series detail modal
├── sidebar.css                 # Specific styles for the history sidebar
├── history.css                 # Additional styles for history items
├── firebase-config.js          # Firebase initialization and API key storage
├── script.js                   # Main application logic, TMDB API calls, caching, personalization
├── modal.js                    # Logic for handling the detail modal
├── sidebar.js                  # Logic for handling the recommendation history sidebar
└── .gitignore                  # Specifies intentionally untracked files to ignore
```

## 🌐 API Integration

### The Movie Database (TMDB) API

CineRandom interacts with the TMDB API to:
*   Search for movies and TV series based on various criteria (genre, rating, year).
*   Fetch detailed information about specific titles (overview, cast, release dates).
*   Retrieve image posters and trailer videos (via YouTube links).

### Firebase Firestore

Firestore serves two crucial roles:
1.  **Caching:** TMDB API responses for common queries are stored in a `cachedRecommendations` collection. This significantly speeds up subsequent requests for the same filters and reduces direct calls to the TMDB API. Cache entries have a `timestamp` to ensure data freshness.
2.  **Personalization:** User "likes" (saved via the heart icon in the detail modal) are stored in a `userLikes` collection. These likes are used to subtly influence future recommendations by prioritizing genres the user has previously enjoyed.

## 🎨 Styling & Responsiveness

The project uses **Tailwind CSS** for its utility-first approach, allowing for rapid UI development and easy customization. The UI is designed to be fully responsive, providing an optimal viewing and interaction experience across various screen sizes, from mobile devices to large desktop displays.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
5.  Push to the branch (`git push origin feature/AmazingFeature`).
6.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file (if you have one, otherwise state no license or a different one) for details.

---
**Note to myself:** This README should now be complete and cover all aspects implied by the provided file structure and logic.You are absolutely right, my apologies for the incomplete response! It seems I cut off mid-sentence.

Here is the complete and properly formatted README for your CineRandom project, incorporating all the details from your provided files:

---

# CineRandom: Discover Your Next Favorite Movie or Series

[![Netlify Status](https://api.netlify.com/api/v1/badges/22d57d77-a8a2-4a7b-a010-388f61405e32/deploy-status)](https://app.netlify.com/sites/cinerandom-movie-recommender/deploys)

CineRandom is a dynamic web application designed to help you effortlessly discover your next favorite movie or TV series. Whether you're in the mood for a film, a show, or just want a surprise, CineRandom uses The Movie Database (TMDB) API to fetch personalized recommendations, enhanced by a robust Firebase Firestore caching system for blazing-fast performance and an engaging user experience.

**Live Website:** [https://cinerandom-movie-recommender.netlify.app/](https://cinerandom-movie-recommender.netlify.app/)

## ✨ Features

*   **Intelligent Recommendations:** Get instant movie or TV series suggestions with a single click.
*   **Advanced Filtering:** Tailor your search with customizable filters:
    *   **Media Type Toggle:** Switch between Movies and TV Series.
    *   **Genre Selection:** Choose from a wide range of genres.
    *   **Minimum Rating:** Set a threshold for the audience score (TMDB rating).
    *   **Quantity Control:** Decide how many recommendations you want to see.
    *   **Year Range:** Filter by release year (min/max).
*   **Personalized Suggestions:** The app learns from your "liked" items (stored anonymously) to subtly influence future recommendations, creating a more custom discovery experience.
*   **Comprehensive Details Modal:** Click on any recommendation to view:
    *   Title, poster, and TMDB rating.
    *   In-depth overview and top cast.
    *   Release date and runtime (for movies) or episode runtime (for TV series).
    *   Direct links to YouTube trailers, TMDB, and IMDb pages.
    *   "Like" button to save preferences for personalization.
    *   "Copy Title" button for quick sharing.
*   **Recommendation History:** Keep track of all your past discoveries in an immersive, slide-out sidebar, allowing you to revisit items you've seen.
*   **Optimized Performance:** Leverages Firebase Firestore for intelligent caching of TMDB API responses, significantly reducing load times for repeated queries and enhancing the user experience. Cache entries are managed with a Time-To-Live (TTL) to ensure data freshness.
*   **Responsive Design:** A clean, intuitive, and fully responsive user interface ensures a seamless experience across all devices, from desktops to mobile phones.

## 🚀 Technologies Used

*   **Frontend:**
    *   HTML5
    *   CSS3 (with Tailwind CSS for utility-first styling)
    *   JavaScript (ES6+)
*   **API Integration:**
    *   **The Movie Database (TMDB) API:** For movie/TV series data, images, trailers, and cast information.
*   **Backend/Services:**
    *   **Firebase Firestore:** Used for:
        *   Caching TMDB API responses to improve performance and reduce API calls.
        *   Storing anonymous user "likes" for basic personalization.
    *   **Netlify:** For continuous deployment and hosting.

## 🎬 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following:

*   A web browser
*   **A TMDB API Key:** You can get one by registering at [TMDB API](https://www.themoviedb.org/documentation/api).
*   **A Firebase Project:** Create one at [Firebase Console](https://console.firebase.google.com/) and enable Firestore.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cinerandom.git
cd cinerandom
```

### 2. Configure Firebase and TMDB API Keys

Create a file named `firebase-config.js` in the root of your project. This file will hold your Firebase project configuration and your TMDB API key.

```javascript
// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY", // <--- Replace with your Firebase API Key
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firebase instance and Firestore DB
export { app, db };

// Export your TMDB API key
export const TMDB_API_KEY = "YOUR_TMDB_API_KEY"; // <--- Replace with your TMDB API Key
```
**Important:** For production deployment (e.g., on Netlify), it's highly recommended to use environment variables (`process.env.TMDB_API_KEY`, etc.) rather than hardcoding keys directly in the `firebase-config.js` file. This prevents sensitive information from being publicly exposed. For local development, ensure `firebase-config.js` is added to your `.gitignore` to prevent accidental commitment.

### 3. Run the application

Since this is a client-side only application, you can simply open `index.html` in your web browser.

For a better development experience and to avoid potential CORS issues, it's recommended to use a simple local web server:

```bash
# If you have http-server installed globally (npm install -g http-server)
http-server .
```
Alternatively, you can use the "Live Server" extension in Visual Studio Code.

## 📁 Project Structure

```
cinerandom/
├── index.html                  # Main HTML file, structure for the entire application
├── style.css                   # General CSS rules and global styles
├── tailwind.css                # Compiled Tailwind CSS output (includes base, components, utilities)
├── modal.css                   # Specific styles for the movie/series detail modal
├── sidebar.css                 # Specific styles for the recommendation history sidebar
├── history.css                 # Additional styles specific to history items within the sidebar
├── firebase-config.js          # Initializes Firebase, configures Firestore, and stores API keys
├── script.js                   # Core application logic: filter handling, TMDB API calls, Firebase caching, personalization
├── modal.js                    # Handles the opening, closing, and content display of the detail modal
├── sidebar.js                  # Manages the opening, closing, and content display of the history sidebar
└── .gitignore                  # Specifies files and directories to be ignored by Git
```

## 🌐 API Integration Details

### The Movie Database (TMDB) API

CineRandom extensively leverages the TMDB API to:
*   **Discover Media:** Fetch lists of movies and TV series based on genres, ratings, and release years.
*   **Retrieve Details:** Obtain comprehensive information for individual titles, including overviews, cast, runtime, and release dates.
*   **Access Media Assets:** Display posters and fetch YouTube trailer links.
The `TMDB_API_KEY` defined in `firebase-config.js` is crucial for all interactions with this API.

### Firebase Firestore

Firestore acts as the project's lightweight backend, primarily for:
1.  **Smart Caching:** API responses from TMDB for specific queries (e.g., "popular movies in action genre") are stored in the `cachedRecommendations` collection. Before making a new TMDB call, the application checks the cache. If a fresh, relevant entry exists, it's served immediately, vastly improving performance and reducing external API load.
2.  **Anonymous Personalization:** When a user "likes" a movie or TV series, its ID and media type are anonymously stored in the `userLikes` collection. This data is then used to subtly influence subsequent recommendation searches, gently steering towards genres the user has previously expressed interest in.

## 🎨 Styling & Responsiveness

The project is styled using **Tailwind CSS**, a utility-first CSS framework. This approach allows for highly customizable and maintainable styling directly within the HTML markup. The UI is designed to be fully responsive, ensuring an optimal and intuitive experience across various devices, from widescreen desktops to smartphones, by adapting its layout and elements dynamically.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
5.  Push to the branch (`git push origin feature/AmazingFeature`).
6.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
