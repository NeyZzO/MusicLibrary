import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Search, Star, Clock, ListMusic, Music2, User, Loader2 } from 'lucide-react';
import { TITLES, ALBUMS, AUTHORS } from '../mocks/db';
import { cn } from '../utils/cn';
import { useDebounce } from '../hooks/useDebounce';
import { isPerfectMatch, rankResults } from '../utils/lyricsMatching';

interface LRCLibResult {
  id: number;
  name: string;
  trackName: string;
  artistName: string;
  albumName: string;
  duration: number;
  syncedLyrics: string;
  plainLyrics: string;
  instrumental: boolean;
}

export default function SelectLyrics() {
  const { trackId } = useParams();
  const track = TITLES.find(t => t.id === trackId);
  const author = AUTHORS.find(a => a.id === track?.authorId);
  const album = ALBUMS.find(a => a.id === track?.albumId);

  const [searchTitle, setSearchTitle] = useState(track?.name || '');
  const [searchArtist, setSearchArtist] = useState(author?.name || '');
  const [searchAlbum, setSearchAlbum] = useState(album?.title || '');
  
  const debouncedTitle = useDebounce(searchTitle, 500);
  const debouncedArtist = useDebounce(searchArtist, 500);
  const debouncedAlbum = useDebounce(searchAlbum, 500);

  const [results, setResults] = useState<LRCLibResult[]>([]);
  const [selectedLrc, setSelectedLrc] = useState<LRCLibResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLyrics = async (manual = false) => {
    // Prevent fetching if everything is empty
    if (!debouncedTitle && !debouncedArtist && !debouncedAlbum && !manual) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (debouncedTitle) params.append('track_name', debouncedTitle);
      if (debouncedArtist) params.append('artist_name', debouncedArtist);
      if (debouncedAlbum) params.append('album_name', debouncedAlbum);

      const res = await fetch(`https://lrclib.net/api/search?${params.toString()}`);
      if (!res.ok) throw new Error('Erreur réseau lors de la recherche des paroles');
      
      const data: LRCLibResult[] = await res.json();
      
      // Ranking results using our custom logic
      const rankedData = rankResults(data, track?.duration || 0, debouncedTitle, debouncedArtist, debouncedAlbum);
      
      setResults(rankedData);
      if (rankedData.length > 0 && !selectedLrc) {
        setSelectedLrc(rankedData[0]);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur inattendue s\'est produite');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLyrics();
  }, [debouncedTitle, debouncedArtist, debouncedAlbum]);

  if (!track) return <div className="text-white p-8">Track not found</div>;

  return (
    <div className="h-full flex flex-col -m-8">
      {/* Search Header */}
      <div className="bg-neutral-900 border-b border-neutral-800 p-6 flex flex-col gap-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <ListMusic className="text-indigo-500" />
          Trouver des paroles pour "{track.name}"
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Music2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              value={searchTitle} onChange={e => setSearchTitle(e.target.value)}
              placeholder="Titre"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md py-2 pl-10 pr-4 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              value={searchArtist} onChange={e => setSearchArtist(e.target.value)}
              placeholder="Auteur"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md py-2 pl-10 pr-4 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <ListMusic className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input 
                value={searchAlbum} onChange={e => setSearchAlbum(e.target.value)}
                placeholder="Album"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-md py-2 pl-10 pr-4 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <button 
              onClick={() => fetchLyrics(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 rounded-md transition flex items-center justify-center disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Lyrics preview */}
        <div className="flex-1 bg-neutral-900 border-r border-neutral-800 p-8 overflow-y-auto">
          {selectedLrc ? (
            <div className="max-w-2xl mx-auto text-lg whitespace-pre-wrap leading-loose text-neutral-300 font-medium">
              {!!selectedLrc.syncedLyrics && <span className="text-sm font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full mb-6 inline-block">Synchronisé</span>}
              <br/>
              {selectedLrc.syncedLyrics || selectedLrc.plainLyrics || "Aucune parole trouvée pour ce résultat (instrumental ?)"}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-neutral-500">
              {isLoading ? 'Recherche en cours...' : 'Sélectionnez un résultat à droite pour prévisualiser les paroles.'}
            </div>
          )}
        </div>

        {/* Right: Results list */}
        <div className="w-[450px] bg-neutral-950 overflow-y-auto p-4 space-y-3">
          <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4 px-2">Résultats LRCLIB</h2>
          
          {error && <div className="text-red-400 px-2 py-4">{error}</div>}
          {!isLoading && results.length === 0 && !error && (
            <div className="text-neutral-500 px-2 py-4 text-center">Aucun résultat trouvé. Essayez de modifier les termes de recherche.</div>
          )}
          {isLoading && results.length === 0 && (
             <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-neutral-500" /></div>
          )}

          {results.map((res) => {
            const perfectMatch = isPerfectMatch(
              res, 
              track.duration, 
              debouncedTitle, 
              debouncedArtist,
              debouncedAlbum
            );
            const durationMatch = Math.abs((res.duration || 0) - track.duration) <= 2;
            const hasSynced = !!res.syncedLyrics;

            return (
              <div 
                key={res.id} 
                onClick={() => setSelectedLrc(res)}
                className={cn(
                  "p-4 rounded-xl cursor-pointer transition-colors border",
                  selectedLrc?.id === res.id 
                    ? "bg-neutral-800 border-indigo-500 shadow-md" 
                    : "bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/50"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="text-white font-bold truncate" title={res.trackName || res.name}>{res.trackName || res.name}</h3>
                    <div className="text-sm text-neutral-400 truncate" title={res.artistName}>{res.artistName}</div>
                    <div className="text-xs text-neutral-500 truncate" title={res.albumName}>{res.albumName}</div>
                  </div>
                  {perfectMatch && (
                    <div className="w-6 h-6 flex-shrink-0 bg-white rounded-full flex items-center justify-center shadow-lg" title="Meilleur résultat!">
                      <Star className="w-3.5 h-3.5 text-green-500 fill-current" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {hasSynced && (
                    <div className="text-xs px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 font-medium">
                      Synced
                    </div>
                  )}
                  {res.instrumental && (
                    <div className="text-xs px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 font-medium">
                      Instrumental
                    </div>
                  )}
                  {durationMatch ? (
                    <div className="text-xs px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Durée OK
                    </div>
                  ) : (
                    <div className="text-xs px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {Math.floor((res.duration || 0) / 60)}:{((res.duration || 0) % 60).toString().padStart(2, '0')}
                    </div>
                  )}
                </div>
                
                {selectedLrc?.id === res.id && (
                  <button className="mt-4 w-full bg-white text-black font-bold py-2 rounded-lg hover:bg-neutral-200 transition">
                    Associer ces paroles
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}