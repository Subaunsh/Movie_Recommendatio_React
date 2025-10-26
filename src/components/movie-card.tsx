import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Movie } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, Tv, Play, Clapperboard, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

const placeholderImage = PlaceHolderImages.find(p => p.id === 'movie-placeholder');

type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  const { toast } = useToast();
  const platform = movie.platform || movie.streamingPlatform || movie.streamingAvailability;

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const savedWatchlists = JSON.parse(localStorage.getItem('my-watchlist') || '[]');
      const isAlreadyAdded = savedWatchlists.some((m: Movie) => m.title === movie.title);

      if (isAlreadyAdded) {
        toast({
          title: 'Already in Watchlist',
          description: `"${movie.title}" is already in your watchlist.`,
        });
        return;
      }

      const newWatchlist = [movie, ...savedWatchlists];
      localStorage.setItem('my-watchlist', JSON.stringify(newWatchlist));
      toast({
        title: 'Added to Watchlist!',
        description: `"${movie.title}" has been added.`,
      });
      // Dispatch a custom event to notify other components (like the watchlist page)
      window.dispatchEvent(new Event('watchlistUpdated'));
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to Add',
        description: 'Could not add movie to your watchlist.',
      });
    }
  };

  return (
    <Card className="group relative flex flex-col overflow-hidden h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-48">
      <CardHeader className="p-0">
        <div className="aspect-[2/3] relative">
          {placeholderImage && (
             <Image
                src={placeholderImage.imageUrl}
                alt={movie.title}
                fill
                className="object-cover"
                data-ai-hint={placeholderImage.imageHint}
            />
          )}
           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button variant="secondary" size="sm">
              <Play className="mr-1 h-4 w-4" />
              Movie
            </Button>
            <Button variant="destructive" size="sm">
              <Clapperboard className="mr-1 h-4 w-4" />
              Trailer
            </Button>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-primary hover:text-primary-foreground"
            onClick={handleAddToWatchlist}
            aria-label="Add to watchlist"
          >
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-3 space-y-1">
        <CardTitle className="font-headline text-base leading-tight">{movie.title} {movie.year && `(${movie.year})`}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs">{movie.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex flex-wrap gap-1.5">
        {movie.imdbRating && (
          <Badge variant="secondary" className="gap-1 pl-1 text-[10px]">
            <Star className="size-3 fill-yellow-400 text-yellow-400" />
            {movie.imdbRating}
          </Badge>
        )}
        {platform && (
          <Badge variant="outline" className="gap-1 pl-1 text-[10px]">
            <Tv className="size-3" />
            {platform}
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
}
