import { Show, UserButton } from '@clerk/nextjs';
import { CodeIcon } from 'lucide-react';
import Link from 'next/link';
import DashboardBtn from './DashboardBtn';
import ModeToggle from './ThemeToggling';

const Navbar = () => {
  return (
    <nav>
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* left side */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity"
        >
          <CodeIcon className="size-8 text-emerald-500" />
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            CodeSync
          </span>
        </Link>
        {/* actions */}
        <div className="flex items-center space-x-4 ml-auto">
        
          <Show when={"signed-in"}>
            <DashboardBtn />
            <ModeToggle />
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  );
}

export default Navbar