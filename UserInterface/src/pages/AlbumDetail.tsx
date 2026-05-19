import { useParams, Link } from 'react-router';
import { Play } from 'lucide-react';
import { ALBUMS, TITLES, AUTHORS } from '../mocks/db';
import { usePlayerStore } from '../store/playerStore';

export default function AlbumDetail() {
  const { id } = useParams<{ id: string }>();
  const album = ALBUMS.find(a => a.id === id);
  const playTitle = usePlayerStore(state => state.playTitle);

  if (!album) return <div className="text-neutral-400">Album not found</div>;

  const author = AUTHORS.find(a => a.id === album.authorId);
  const albumTitles = TITLES.filter(t => t.albumId === id);

  return (
    <div className="-m-8 pb-32 bg-gradient-to-b from-neutral-800 to-neutral-900 min-h-full">
      <div className="flex items-end p-8 space-x-6 h-72">
        <img src={album.coverUrl} alt={album.title} className="w-52 h-52 shadow-2xl rounded" />
        <div className="mb-2">
          <span className="text-sm font-bold uppercase text-white tracking-widest">Album</span>
          <h1 className="text-6xl font-black text-white mt-2 mb-4">{album.title}</h1>
          <div className="flex items-center text-sm font-medium text-white space-x-2">
            <img src={author?.photoUrl} alt="" className="w-6 h-6 rounded-full" />
            <Link to={`/artists/${author?.id}`} className="hover:underline">{author?.name}</Link>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-400">{album.releaseYear}</span>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-400">{albumTitles.length} songs</span>
          </div>
        </div>
      </div>

      <div className="p-8 bg-neutral-900/50 min-h-screen">
        <div className="mb-6 flex items-center space-x-4 text-neutral-400 text-sm uppercase tracking-wider font-semibold px-4">
          <div className="w-8">#</div>
          <div className="flex-1">Title</div>
          <div className="w-16">Duration</div>
        </div>
        
        <div className="space-y-1">
          {albumTitles.map((track, i) => (
            <div 
              key={track.id} 
              className="flex items-center px-4 py-3 hover:bg-neutral-800 rounded-lg group cursor-pointer"
              onClick={() => playTitle(track, author || null, album)}
            >
              <div className="w-8 text-neutral-400 relative">
                <span className="group-hover:hidden">{i + 1}</span>
                <Play className="w-4 h-4 text-white fill-current absolute top-0 left-0 hidden group-hover:block" />
              </div>
              <div className="flex-1">
                <div className="text-white font-medium mb-0.5">{track.name}</div>
                <div className="text-neutral-400 text-sm">{author?.name}</div>
              </div>
              <div className="w-16 text-neutral-400 text-sm">
                {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
