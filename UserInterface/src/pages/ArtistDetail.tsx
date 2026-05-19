import { useParams, Link } from 'react-router';
import { Play } from 'lucide-react';
import { AUTHORS, ALBUMS, TITLES } from '../mocks/db';
import { usePlayerStore } from '../store/playerStore';

export default function ArtistDetail() {
  const { id } = useParams<{ id: string }>();
  const author = AUTHORS.find((a) => a.id === id);
  const playTitle = usePlayerStore(state => state.playTitle);

  if (!author) return <div className="text-neutral-400">Artist not found</div>;

  const artistAlbums = ALBUMS.filter(a => a.authorId === id);
  const artistTitles = TITLES.filter(t => t.authorId === id);

  return (
    <div className="-m-8 pb-32">
      {/* Banner */}
      <div 
        className="h-64 relative flex items-end p-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${author.bannerUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
        <div className="relative z-10 flex items-center space-x-6">
          <img src={author.photoUrl} alt={author.name} className="w-32 h-32 rounded-full shadow-2xl border-4 border-neutral-900 object-cover" />
          <div>
            <h1 className="text-6xl font-black text-white">{author.name}</h1>
            <p className="mt-2 text-neutral-300 font-medium">Artist • {artistTitles.length} tracks</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Popular Tracks */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Popular</h2>
          <div className="space-y-1">
            {artistTitles.map((track, i) => {
              const album = ALBUMS.find(a => a.id === track.albumId);
              return (
                <div 
                  key={track.id} 
                  className="flex items-center p-3 hover:bg-neutral-800 rounded-lg group cursor-pointer"
                  onClick={() => playTitle(track, author, album || null)}
                >
                  <div className="w-8 text-center text-neutral-400 font-medium">{i + 1}</div>
                  <div className="w-10 h-10 mr-4 flex-shrink-0 flex items-center justify-center relative">
                    <img src={album?.coverUrl} alt="" className="w-full h-full object-cover rounded shadow" />
                    <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center rounded">
                       <Play className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>
                  <div className="flex-1 text-white font-medium">{track.name}</div>
                  <div className="text-neutral-400 text-sm">{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Albums */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Albums</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {artistAlbums.map((album) => (
              <Link 
                key={album.id} 
                to={`/albums/${album.id}`}
                className="group flex flex-col p-4 bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors"
              >
                <div className="w-full aspect-square mb-4 rounded-md overflow-hidden shadow-lg">
                  <img src={album.coverUrl} alt={album.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-white truncate">{album.title}</h3>
                <span className="text-sm text-neutral-400 mt-1">{album.releaseYear}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
