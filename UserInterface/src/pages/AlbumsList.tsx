import { Link } from 'react-router';
import { ALBUMS, AUTHORS } from '../mocks/db';

export default function AlbumsList() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Albums</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {ALBUMS.map((album) => {
          const author = AUTHORS.find(a => a.id === album.authorId);
          return (
            <Link 
              key={album.id} 
              to={`/albums/${album.id}`}
              className="group flex flex-col p-4 bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors"
            >
              <div className="w-full aspect-square mb-4 rounded-md overflow-hidden shadow-lg">
                <img src={album.coverUrl} alt={album.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-white truncate">{album.title}</h3>
              <span className="text-sm text-neutral-400 mt-1">{author?.name} • {album.releaseYear}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
