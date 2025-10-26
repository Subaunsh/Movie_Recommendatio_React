import { SidebarTrigger } from '@/components/ui/sidebar';
import { Film } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm md:hidden">
      <div className="container mx-auto flex h-14 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <Film className="size-6 text-primary" />
          <span className="font-bold font-headline">Cine Genie</span>
        </div>
      </div>
    </header>
  );
}
