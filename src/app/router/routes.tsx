import { createBrowserRouter } from 'react-router-dom'
import App from '../../App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'explore', element: <ExplorePage /> },
      { path: 'library/:tab', element: <LibraryPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'playlist/:id', element: <PlaylistPage /> },
      { path: 'artist/:id', element: <ArtistPage /> },
      { path: 'album/:id', element: <AlbumPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])

// Placeholder pages - will be implemented in later phases
function HomePage() {
  return <div data-testid="home-page">Home Page</div>
}

function ExplorePage() {
  return <div data-testid="explore-page">Explore Page</div>
}

function LibraryPage() {
  return <div data-testid="library-page">Library Page</div>
}

function SearchPage() {
  return <div data-testid="search-page">Search Page</div>
}

function PlaylistPage() {
  return <div data-testid="playlist-page">Playlist Page</div>
}

function ArtistPage() {
  return <div data-testid="artist-page">Artist Page</div>
}

function AlbumPage() {
  return <div data-testid="album-page">Album Page</div>
}

function SettingsPage() {
  return <div data-testid="settings-page">Settings Page</div>
}