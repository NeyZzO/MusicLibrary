import { useUIStore } from '../store/uiStore';
import { TITLES } from '../mocks/db';
import { X } from 'lucide-react';

export default function RetagModal() {
  const { retagModal, closeRetagModal } = useUIStore();
  const track = TITLES.find(t => t.id === retagModal.trackId);

  if (!retagModal.isOpen || !track) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-md shadow-2xl relative">
        <button 
          onClick={closeRetagModal}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-bold text-white mb-6">Ré-ettiquetter le titre</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Titre</label>
            <input 
              type="text" 
              defaultValue={track.name}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-indigo-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Artiste</label>
            <input 
              type="text" 
              placeholder="Nom de l'artiste"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-indigo-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Album</label>
            <input 
              type="text" 
              placeholder="Nom de l'album"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-indigo-500" 
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button 
            onClick={closeRetagModal}
            className="px-4 py-2 rounded-md hover:bg-neutral-800 text-white font-medium transition"
          >
            Annuler
          </button>
          <button 
            onClick={closeRetagModal}
            className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}