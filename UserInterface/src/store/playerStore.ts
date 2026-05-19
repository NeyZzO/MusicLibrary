import { create } from 'zustand';
import type { Title, Author, Album } from '../types';

interface PlayerState {
  currentTitle: Title | null;
  currentAuthor: Author | null;
  currentAlbum: Album | null;
  isPlaying: boolean;
  progress: number; // 0 to 100
  playTitle: (title: Title, author: Author | null, album: Album | null) => void;
  togglePlay: () => void;
  setProgress: (progress: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTitle: null,
  currentAuthor: null,
  currentAlbum: null,
  isPlaying: false,
  progress: 0,
  playTitle: (title, author, album) => set({ 
    currentTitle: title, 
    currentAuthor: author, 
    currentAlbum: album, 
    isPlaying: true, 
    progress: 0 
  }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setProgress: (progress) => set({ progress }),
}));
