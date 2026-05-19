import { Link } from 'react-router';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-5xl font-black text-white mb-6">Welcome to MusicLib</h1>
      <p className="text-xl text-neutral-400 mb-10 max-w-lg">
        Your local music, beautifully organized. Browse your artists, albums, or discover unaggregated files.
      </p>
      <div className="flex space-x-6">
        <Link to="/artists" className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-bold transition">
          Browse Artists
        </Link>
        <Link to="/albums" className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full font-bold transition">
          Browse Albums
        </Link>
      </div>
    </div>
  );
}
