import { TITLES, ALBUMS, AUTHORS } from '../mocks/db';
import { Play } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { useUIStore } from '../store/uiStore';
import { cn } from '../utils/cn';

export default function TracksList() {
  const { playTitle, currentTitle, isPlaying } = usePlayerStore();
  const { openContextMenu } = useUIStore();
  const aggregated = TITLES.filter(t => t.hasAggregatedInfo);

  const handleContextMenu = (e: React.MouseEvent, trackId: string) => {
    e.preventDefault();
    openContextMenu(e.clientX, e.clientY, trackId);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">All Tracks</h1>
      
      <div className="bg-neutral-900 rounded-xl p-4">
        <div className="flex items-center px-4 py-2 border-b border-neutral-800 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
          <div className="w-12">#</div>
          <div className="flex-1">Title</div>
          <div className="flex-1">Album</div>
          <div className="w-24">Duration</div>
        </div>
        
        <div className="space-y-1">
          {aggregated.map((track, i) => {
            const album = ALBUMS.find(a => a.id === track.albumId);
            const author = AUTHORS.find(a => a.id === track.authorId);
            const isCurrentTrack = currentTitle?.id === track.id;

            return (
              <div 
                key={track.id} 
                className="flex items-center px-4 py-3 hover:bg-neutral-800 rounded-lg group cursor-pointer"
                onClick={() => playTitle(track, author || null, album || null)}
                onContextMenu={(e) => handleContextMenu(e, track.id)}
              >
                <div className="w-12 text-center text-neutral-400 relative flex items-center justify-center">
                  {!isCurrentTrack && <span className="group-hover:hidden">{i + 1}</span>}
                  
                  {isCurrentTrack && isPlaying && (
                    <div className="flex items-end justify-center space-x-[2px] h-4 w-4">
                      <div className="equalizer-bar"></div>
                      <div className="equalizer-bar"></div>
                      <div className="equalizer-bar"></div>
                      <div className="equalizer-bar"></div>
                    </div>
                  )}
                  {isCurrentTrack && !isPlaying && (
                    <span className="text-green-500 font-bold">{i + 1}</span>
                  )}
                  
                  <Play className={cn(
                    "w-4 h-4 fill-current absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block",
                    isCurrentTrack ? "text-green-500" : "text-white"
                  )} />
                </div>
                <div className="flex-1 flex items-center">
                  <img src={album?.coverUrl} className="w-10 h-10 rounded mr-4" alt="" />
                  <div>
                    <div className={cn("font-medium", isCurrentTrack ? "text-green-500" : "text-white")}>
                      {track.name}
                    </div>
                    <div className="text-neutral-400 text-sm">{author?.name}</div>
                  </div>
                </div>
                <div className="flex-1 text-neutral-400 text-sm">{album?.title}</div>
                <div className="w-24 text-neutral-400 text-sm">
                  {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
