import { SidebarTrigger } from '@/components/ui/sidebar';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm md:hidden">
      <div className="container mx-auto flex h-14 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <path
              d="M6.5 4.5L10 2L13.5 4.5L10 7L6.5 4.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M17.5 19.5L14 22L10.5 19.5L14 17L17.5 19.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M4.5 13.5L2 10L4.5 6.5L7 10L4.5 13.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M19.5 13.5L22 10L19.5 6.5L17 10L19.5 13.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M10 7L14 17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M7 10H17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="font-bold font-headline">Cine Genie</span>
        </div>
      </div>
    </header>
  );
}
