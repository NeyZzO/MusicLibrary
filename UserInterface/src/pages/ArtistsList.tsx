import { Link } from 'react-router';
import { AUTHORS } from '../mocks/db';

export default function ArtistsList() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Artists</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {AUTHORS.map((author) => (
          <Link 
            key={author.id} 
            to={`/artists/${author.id}`}
            className="group flex flex-col items-center p-4 bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <div className="w-full aspect-square mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
              <img 
                src={author.photoUrl} 
                alt={author.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-white text-center w-full truncate">{author.name}</h3>
            <span className="text-sm text-neutral-400 mt-1">Artist</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
