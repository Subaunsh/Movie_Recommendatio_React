'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getMoodMoviesAction } from '@/app/actions';
import type { Movie } from '@/lib/types';
import { MovieCard } from '@/components/movie-card';
import { Loader2, Clapperboard } from 'lucide-react';
import { Separator } from '../ui/separator';

const moods = [
  { name: 'Nostalgic', emoji: '🕰️' },
  { name: 'Thrilling', emoji: '🎢' },
  { name: 'Funny', emoji: '😂' },
  { name: 'Emotional', emoji: '😢' },
  { name: 'Heartwarming', emoji: '💖' },
  { name: 'Intense', emoji: '🔥' },
];

export function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleMoodSelect = async (mood: string) => {
    setIsLoading(true);
    setSelectedMood(mood);
    setMovies([]);

    const result = await getMoodMoviesAction(mood);
    setIsLoading(false);

    if (result.success && result.data) {
      setMovies(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: result.error,
      });
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {moods.map((mood) => (
          <Button
            key={mood.name}
            variant={selectedMood === mood.name ? 'default' : 'secondary'}
            size="lg"
            onClick={() => handleMoodSelect(mood.name)}
            disabled={isLoading && selectedMood === mood.name}
            className="text-lg"
          >
            {isLoading && selectedMood === mood.name ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span className="mr-2">{mood.emoji}</span>
            )}
            {mood.name}
          </Button>
        ))}
      </div>

      {(isLoading || movies.length > 0) && (
        <div className="mt-12">
          <Separator className="my-8" />
          <h2 className="text-3xl font-bold text-center font-headline mb-8">
            {isLoading ? 'Finding movies...' : `Top Picks for a ${selectedMood} Mood`}
          </h2>
          {isLoading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {[...Array(6)].map((_, i) => (
               <div key={i} className="space-y-2">
                   <div className="aspect-[2/3] bg-muted animate-pulse rounded-lg"></div>
                   <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md"></div>
                   <div className="h-4 w-full bg-muted animate-pulse rounded-md"></div>
                   <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md"></div>
               </div>
             ))}
           </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.title} movie={movie} />
              ))}
            </div>
          )}
        </div>
      )}
       {!isLoading && movies.length === 0 && selectedMood && (
        <div className="text-center mt-12 text-muted-foreground">
          <Clapperboard className="mx-auto h-12 w-12" />
          <p className="mt-4">No movies found for this mood. Try another one!</p>
        </div>
      )}
    </>
  );
}
