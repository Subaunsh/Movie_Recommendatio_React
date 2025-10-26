import type { Metadata } from 'next';
import './globals.css';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Film } from 'lucide-react';
import { MainNav } from '@/components/main-nav';
import { SiteHeader } from '@/components/site-header';
import { Toaster } from "@/components/ui/toaster"

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
                <Film className="size-8 text-primary" />
                <h1 className="text-xl font-headline font-bold">Cine Genie</h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <MainNav />
            </SidebarContent>
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
