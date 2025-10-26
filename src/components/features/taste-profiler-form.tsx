'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getRecommendationsAction } from '@/app/actions';
import type { Movie } from '@/lib/types';
import { MovieCard } from '@/components/movie-card';
import { Wand2, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  favoriteMovies: z.string().optional(),
  favoriteGenres: z.string().optional(),
  favoriteDirectors: z.string().optional(),
  favoriteActors: z.string().optional(),
  mood: z.string().optional(),
  platform: z.string().optional(),
});

const moods = ["Any", "Nostalgic", "Thrilling", "Funny", "Emotional", "Heartwarming", "Intense", "Dark"];
const platforms = ["Any", "Netflix", "Prime Video", "Disney+", "Hulu", "Max", "Apple TV+"];

export function TasteProfilerForm() {
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
      mood: 'Any',
      platform: 'Any',
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

    const result = await getRecommendationsAction(formData);
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
                    <Textarea placeholder="e.g., Inception, The Dark Knight, Parasite" {...field} />
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
                    <Textarea placeholder="e.g., Sci-Fi, Thriller, Comedy" {...field} />
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
                    <Input placeholder="e.g., Christopher Nolan, Bong Joon Ho" {...field} />
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
                    <Input placeholder="e.g., Leonardo DiCaprio, Song Kang-ho" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="mood"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Current Mood</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select a mood" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {moods.map(mood => <SelectItem key={mood} value={mood.toLowerCase()}>{mood}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Streaming Platform</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select a platform" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {platforms.map(p => <SelectItem key={p} value={p === 'Any' ? 'any' : p}>{p}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
          </div>
          <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
            Get Recommendations
          </Button>
        </form>
      </Form>

      {(isLoading || recommendations.length > 0) && (
        <div className="mt-12">
          <Separator className="my-8" />
          <h2 className="text-3xl font-bold text-center font-headline mb-8">Your Movie Matches</h2>
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
