import { useUIStore } from '../store/uiStore';
import { Edit2, Mic2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect, useRef } from 'react';

export default function TrackContextMenu() {
  const { contextMenu, closeContextMenu, openRetagModal } = useUIStore();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeContextMenu();
      }
    };
    if (contextMenu.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [contextMenu.isOpen, closeContextMenu]);

  if (!contextMenu.isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="fixed z-50 bg-neutral-800 border border-neutral-700 shadow-2xl rounded-md py-1 w-48 text-sm"
      style={{ top: contextMenu.y, left: contextMenu.x }}
    >
      <button 
        onClick={() => openRetagModal(contextMenu.trackId!)}
        className="w-full flex items-center px-4 py-2 hover:bg-neutral-700 text-left text-neutral-200"
      >
        <Edit2 className="w-4 h-4 mr-3" />
        Ré-ettiquetter
      </button>
      <button 
        onClick={() => {
          closeContextMenu();
          navigate(`/lyrics-select/${contextMenu.trackId}`);
        }}
        className="w-full flex items-center px-4 py-2 hover:bg-neutral-700 text-left text-neutral-200"
      >
        <Mic2 className="w-4 h-4 mr-3" />
        Choisir les paroles
      </button>
    </div>
  );
}