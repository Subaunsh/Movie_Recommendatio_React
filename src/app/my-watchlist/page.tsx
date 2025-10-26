'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/page-header';
import { MovieCard } from '@/components/movie-card';
import type { Movie } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Trash2, ListX } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function MyWatchlistPage() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [isClient, setIsClient] = useState(false);

  const loadWatchlist = () => {
    const saved = localStorage.getItem('my-watchlist');
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  };

  useEffect(() => {
    setIsClient(true);
    loadWatchlist();

    const handleStorageChange = () => loadWatchlist();
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('watchlistUpdated', handleStorageChange); // Listen for custom event

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('watchlistUpdated', handleStorageChange);
    };
  }, []);

  const handleClearWatchlist = () => {
    localStorage.removeItem('my-watchlist');
    setWatchlist([]);
  };

  if (!isClient) {
    return null; // or a loading skeleton
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <PageHeader
          title="My Watchlist"
          description="Your curated list of movies and shows to watch."
        />
        {watchlist.length > 0 && (
           <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto">
                <Trash2 className="mr-2" />
                Clear Watchlist
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your entire watchlist from this device.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearWatchlist}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {watchlist.map((movie) => (
            <MovieCard key={movie.title} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <ListX className="mx-auto h-16 w-16 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">Your Watchlist is Empty</h3>
          <p className="mt-2 text-muted-foreground">
            Click the plus icon on any movie card to add it here.
          </p>
        </div>
      )}
    </div>
  );
}
