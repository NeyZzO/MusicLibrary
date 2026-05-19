import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ArtistsList from './pages/ArtistsList';
import ArtistDetail from './pages/ArtistDetail';
import AlbumsList from './pages/AlbumsList';
import AlbumDetail from './pages/AlbumDetail';
import TracksList from './pages/TracksList';
import UnaggregatedList from './pages/UnaggregatedList';
import SelectLyrics from './pages/SelectLyrics';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'artists',
        element: <ArtistsList />,
      },
      {
        path: 'artists/:id',
        element: <ArtistDetail />,
      },
      {
        path: 'albums',
        element: <AlbumsList />,
      },
      {
        path: 'albums/:id',
        element: <AlbumDetail />,
      },
      {
        path: 'tracks',
        element: <TracksList />,
      },
      {
        path: 'unaggregated',
        element: <UnaggregatedList />,
      },
      {
        path: 'lyrics-select/:trackId',
        element: <SelectLyrics />,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;