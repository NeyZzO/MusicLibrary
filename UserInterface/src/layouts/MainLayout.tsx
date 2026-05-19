import { NavLink, Outlet } from 'react-router';
import { Home, Music, Disc, Users, AlertCircle, Library } from 'lucide-react';
import PlayerBar from '../components/PlayerBar';
import TrackContextMenu from '../components/TrackContextMenu';
import RetagModal from '../components/RetagModal';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-neutral-900 text-neutral-100 overflow-hidden">
      <TrackContextMenu />
      <RetagModal />
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-950 flex flex-col p-4 space-y-4">
        <div className="flex items-center space-x-3 px-2 mb-4">
          <Library className="w-8 h-8 text-indigo-500" />
          <span className="font-bold text-xl">MusicLib</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          <SidebarLink to="/" icon={Home}>Home</SidebarLink>
          <div className="pt-4 pb-2 px-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Library
          </div>
          <SidebarLink to="/artists" icon={Users}>Artistes</SidebarLink>
          <SidebarLink to="/albums" icon={Disc}>Albums</SidebarLink>
          <SidebarLink to="/tracks" icon={Music}>Titres</SidebarLink>
          <SidebarLink to="/unaggregated" icon={AlertCircle}>Non agrégé</SidebarLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-neutral-900 border-l border-neutral-800">
        <div className="flex-1 overflow-y-auto w-full">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Bottom Player Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-24 border-t border-neutral-800 bg-neutral-950 z-50">
        <PlayerBar />
      </div>
    </div>
  );
}

function SidebarLink({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-2 py-2.5 rounded-lg transition-colors ${
          isActive 
            ? 'bg-neutral-800 text-white font-medium' 
            : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </NavLink>
  );
}
