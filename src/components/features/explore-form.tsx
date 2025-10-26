'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getHiddenGemsAction } from '@/app/actions';
import type { Movie } from '@/lib/types';
import { MovieCard } from '@/components/movie-card';
import { Compass, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  favoriteMovies: z.string().min(1, 'Please enter at least one favorite movie.'),
  favoriteGenres: z.string().min(1, 'Please enter at least one favorite genre.'),
  favoriteDirectors: z.string().optional(),
  favoriteActors: z.string().optional(),
});

export function ExploreForm() {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      favoriteMovies: '',
      favoriteGenres: '',
      favoriteDirectors: '',
      favoriteActors: '',
    },
  });

  async function onSubmit() {
    setIsLoading(true);
    setRecommendations([]);
    const formData = new FormData();
    const values = form.getValues();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    const result = await getHiddenGemsAction(formData);
    setIsLoading(false);

    if (result.success && result.data) {
      setRecommendations(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: result.error,
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="favoriteMovies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite Movies</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Oldboy, City of God, Amélie" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="favoriteGenres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite Genres</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Foreign Film, Indie, Psychological Thriller" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="favoriteDirectors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite Directors</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Park Chan-wook, Wong Kar-wai" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="favoriteActors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite Actors</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Mads Mikkelsen, Tony Leung" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <Compass />}
            Discover Gems
          </Button>
        </form>
      </Form>

      {(isLoading || recommendations.length > 0) && (
        <div className="mt-12">
          <Separator className="my-8" />
          <h2 className="text-3xl font-bold text-center font-headline mb-8">Your Hidden Gems</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
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
              {recommendations.map((movie) => (
                <MovieCard key={movie.title} movie={movie} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
