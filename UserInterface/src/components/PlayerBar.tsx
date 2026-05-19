import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';

export default function PlayerBar() {
  const { currentTitle, currentAuthor, currentAlbum, isPlaying, togglePlay, progress } = usePlayerStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between h-full px-6">
      {/* Current Track Info */}
      <div className="flex items-center w-[30%] min-w-[200px] space-x-4">
        {currentAlbum?.coverUrl ? (
          <img src={currentAlbum.coverUrl} alt="Cover" className="w-14 h-14 rounded-md object-cover shadow-md" />
        ) : (
          <div className="w-14 h-14 rounded-md bg-neutral-800" />
        )}
        <div className="flex flex-col truncate">
          <span className="font-semibold text-white truncate">
            {currentTitle?.name || 'No title playing'}
          </span>
          <span className="text-sm text-neutral-400 truncate">
            {currentAuthor?.name || 'Unknown Artist'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center flex-1 max-w-[40%]">
        <div className="flex items-center space-x-6 mb-2">
          <button className="text-neutral-400 hover:text-white transition">
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition transform"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-1" />}
          </button>
          <button className="text-neutral-400 hover:text-white transition">
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center w-full space-x-3 text-xs text-neutral-400">
          <span>{formatTime((progress / 100) * (currentTitle?.duration || 0))}</span>
          <div className="flex-1 h-1 bg-neutral-700 rounded-full cursor-pointer relative group">
            <div 
              className="absolute top-0 left-0 h-full bg-white group-hover:bg-indigo-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>{formatTime(currentTitle ? currentTitle.duration : 0)}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center justify-end w-[30%] min-w-[200px] space-x-3 text-neutral-400">
        <Volume2 className="w-5 h-5" />
        <div className="w-24 h-1 bg-neutral-700 rounded-full cursor-pointer relative group">
          <div className="absolute top-0 left-0 h-full w-2/3 bg-white group-hover:bg-indigo-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}
