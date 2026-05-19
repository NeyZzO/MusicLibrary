import { TITLES } from '../mocks/db';
import { AlertCircle, FileAudio } from 'lucide-react';

export default function UnaggregatedList() {
  const unaggregated = TITLES.filter(t => !t.hasAggregatedInfo);

  return (
    <div>
      <div className="flex items-center space-x-3 mb-8">
        <AlertCircle className="w-8 h-8 text-yellow-500" />
        <h1 className="text-3xl font-bold text-white">Unaggregated Tracks</h1>
      </div>
      <p className="text-neutral-400 mb-8 max-w-2xl">
        These files are missing ID3 metadata (Author, Album) or couldn't be fully resolved. 
        You can play them or edit their properties to organize them into your library.
      </p>

      <div className="bg-neutral-900 rounded-xl overflow-hidden">
        <div className="flex items-center px-6 py-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
          <div className="w-8"></div>
          <div className="flex-1">Filename / Path</div>
          <div className="w-24">Duration</div>
        </div>
        
        <div className="divide-y divide-neutral-800">
          {unaggregated.map((track) => (
            <div key={track.id} className="flex items-center px-6 py-4 hover:bg-neutral-800 transition">
              <div className="w-8 text-neutral-500">
                <FileAudio className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <div className="text-white font-medium truncate mb-1">{track.name}</div>
                <div className="text-xs text-neutral-500 truncate font-mono">{track.filePath}</div>
              </div>
              <div className="w-24 text-sm text-neutral-400">
                {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
              </div>
            </div>
          ))}
          {unaggregated.length === 0 && (
            <div className="p-8 text-center text-neutral-500">
              No unaggregated files found. Your library is perfectly organized!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
