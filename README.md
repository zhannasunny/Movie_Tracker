
# Movie_Tracker

## About the Project

Movie Tracker is a full-stack movie and TV discovery application that allows users to search for movies and TV shows, explore available titles, and save their favorites to a personalized watchlist. Users can create an account and log in to manage their own lists.

## Built With (Tech Stack)

- JavaScript
- React
- CSS
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- TMDB API

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js and npm](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) database (local or MongoDB Atlas)
- [TMDB API key](https://www.themoviedb.org/settings/api)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/zhannasunny/Movie_Tracker.git
   cd Movie_Tracker
   ```

2. **Install frontend dependencies**

   From the project root directory, run:

   ```bash
   npm install
   ```

3. **Install backend dependencies**

   Navigate to the backend directory:

   ```bash
   cd backend
   npm install
   ```

4. **Configure environment variables**

   Create the required `.env` files as described in the Environment Variables section below.

5. **Start the backend server**

   From the `backend` directory, run:

   ```bash
   npm start
   ```

   The backend server runs on `http://localhost:5000`.

6. **Start the frontend**

   Open a second terminal, navigate to the project root, and run:

   ```bash
   npm start
   ```

   The React application runs on `http://localhost:3000`.

   Open the frontend URL in your browser to use the application.

## Environment Variables

Create `.env` files in the appropriate directories and add the following variables.

### Backend (`backend/.env`)

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A secret string used to sign and verify authentication tokens.

### Frontend (root `.env`)

```env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
```

- `REACT_APP_TMDB_API_KEY`: Your API key from The Movie Database (TMDB), used to retrieve movie and TV show information.

**Important:** Replace the placeholder values with your own credentials. Never commit `.env` files or expose API keys and secrets in a public repository.

## Usage

1. **Discover titles:** Browse and search for movies and TV shows using information from TMDB.
2. **Create an account:** Register an account to access personalized features.
3. **Log in:** Authenticate to access your personal watchlist.
4. **Manage your watchlist:** Add favorite movies and TV shows to your list and remove titles when they are no longer needed.

## Project Structure

```text
Movie_Tracker/
├── backend/
│   ├── ...             # Express server, API routes, models, and middleware
│   └── .env            # Backend environment variables
├── public/             # Static frontend assets
├── src/                # React components and application code
├── .env                # Frontend environment variables
├── package.json        # Frontend dependencies and scripts
└── README.md
```

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for movie and TV show data.
