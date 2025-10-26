import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Movie } from '@/lib/types';
import { Star, Tv, Play, Clapperboard, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

const defaultImage = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlcnxlbnwwfHx8fDE3NjE0MTMxMDJ8MA&ixlib=rb-4.1.0&q=80&w=200";

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

  const handleTrailerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (movie.trailerUrl && movie.trailerUrl !== 'https://www.example.com') {
      window.open(movie.trailerUrl, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        variant: "destructive",
        title: "Trailer not available",
        description: `We couldn't find a trailer for "${movie.title}".`,
      })
    }
  };
  
  const handleMovieClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
        title: "Feature coming soon!",
        description: "The ability to watch movies is not yet implemented.",
    });
  }

  return (
    <Card className="group relative flex flex-col overflow-hidden h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-48">
      <CardHeader className="p-0">
        <div className="aspect-[2/3] relative">
           <Image
              src={movie.imageUrl || defaultImage}
              alt={movie.title}
              fill
              className="object-cover"
              data-ai-hint="movie poster"
          />
           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button variant="secondary" size="sm" onClick={handleMovieClick}>
              <Play className="mr-1 h-4 w-4" />
              Movie
            </Button>
            <Button variant="destructive" size="sm" onClick={handleTrailerClick}>
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
