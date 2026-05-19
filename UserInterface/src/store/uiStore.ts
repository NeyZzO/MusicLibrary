import { create } from 'zustand';

interface UIState {
  contextMenu: {
    isOpen: boolean;
    x: number;
    y: number;
    trackId: string | null;
  };
  retagModal: {
    isOpen: boolean;
    trackId: string | null;
  };
  openContextMenu: (x: number, y: number, trackId: string) => void;
  closeContextMenu: () => void;
  openRetagModal: (trackId: string) => void;
  closeRetagModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  contextMenu: { isOpen: false, x: 0, y: 0, trackId: null },
  retagModal: { isOpen: false, trackId: null },
  
  openContextMenu: (x, y, trackId) => set({
    contextMenu: { isOpen: true, x, y, trackId }
  }),
  closeContextMenu: () => set((state) => ({
    contextMenu: { ...state.contextMenu, isOpen: false }
  })),
  
  openRetagModal: (trackId) => set({
    retagModal: { isOpen: true, trackId },
    contextMenu: { isOpen: false, x: 0, y: 0, trackId: null } // close context menu if open
  }),
  closeRetagModal: () => set((state) => ({
    retagModal: { ...state.retagModal, isOpen: false }
  })),
}));