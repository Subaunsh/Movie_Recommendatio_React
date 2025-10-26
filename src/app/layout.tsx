import type { Metadata } from 'next';
import './globals.css';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider, SidebarFooter, SidebarMenuButton } from '@/components/ui/sidebar';
import { LogIn } from 'lucide-react';
import { MainNav } from '@/components/main-nav';
import { SiteHeader } from '@/components/site-header';
import { Toaster } from "@/components/ui/toaster"
import { SignInDialog } from '@/components/features/sign-in-dialog';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

export const metadata: Metadata = {
  title: 'Cine Genie',
  description: 'Your Personalized Movie Recommendation Engine',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2.5 p-2">
                <svg
                  width="32"
                  height="32"
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
                <h1 className="text-xl font-headline font-bold">Cine Genie</h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <MainNav />
            </SidebarContent>
            <SidebarFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <SidebarMenuButton>
                    <LogIn />
                    <span>Sign In / Sign Up</span>
                  </SidebarMenuButton>
                </DialogTrigger>
                <SignInDialog />
              </Dialog>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <SiteHeader />
            <main>{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
