const fs = require('fs');
const path = require('path');

console.log("Starting Netlify build script...");

const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Replace TMDB API Key
indexContent = indexContent.replace(
    /VITE_TMDB_API_KEY/g,
    process.env.VITE_TMDB_API_KEY || 'YOUR_TMDB_API_KEY_NOT_SET' // Fallback for local testing if not using env vars
);

// Replace Firebase Config
indexContent = indexContent.replace(
    /VITE_FIREBASE_API_KEY/g,
    process.env.VITE_FIREBASE_API_KEY || 'YOUR_FIREBASE_API_KEY_NOT_SET'
);
indexContent = indexContent.replace(
    /VITE_FIREBASE_AUTH_DOMAIN/g,
    process.env.VITE_FIREBASE_AUTH_DOMAIN || 'YOUR_FIREBASE_AUTH_DOMAIN_NOT_SET'
);
indexContent = indexContent.replace(
    /VITE_FIREBASE_PROJECT_ID/g,
    process.env.VITE_FIREBASE_PROJECT_ID || 'YOUR_FIREBASE_PROJECT_ID_NOT_SET'
);
indexContent = indexContent.replace(
    /VITE_FIREBASE_STORAGE_BUCKET/g,
    process.env.VITE_FIREBASE_STORAGE_BUCKET || 'YOUR_FIREBASE_STORAGE_BUCKET_NOT_SET'
);
indexContent = indexContent.replace(
    /VITE_FIREBASE_MESSAGING_SENDER_ID/g,
    process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_FIREBASE_MESSAGING_SENDER_ID_NOT_SET'
);
indexContent = indexContent.replace(
    /VITE_FIREBASE_APP_ID/g,
    process.env.VITE_FIREBASE_APP_ID || 'YOUR_FIREBASE_APP_ID_NOT_SET'
);
indexContent = indexContent.replace(
    /VITE_FIREBASE_MEASUREMENT_ID/g,
    process.env.VITE_FIREBASE_MEASUREMENT_ID || 'YOUR_FIREBASE_MEASUREMENT_ID_NOT_SET'
);

fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log("API keys replaced in index.html.");

// Exit successfully
process.exit(0);