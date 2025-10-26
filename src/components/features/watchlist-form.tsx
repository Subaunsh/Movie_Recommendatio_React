'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getAiWatchlistAction } from '@/app/actions';
import type { Movie } from '@/lib/types';
import { Wand2, Loader2, Film } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { WatchlistActions } from './watchlist-actions';

const formSchema = z.object({
  mood: z.string().min(1, 'Please select a mood.'),
  genre: z.string().optional(),
  streamingPlatform: z.string().optional(),
});

const moods = ["Rainy Night", "Girls Night", "Action-Packed Weekend", "Mind-Bending Marathon", "Date Night", "Laugh Out Loud"];
const genres = ["Any", "Comedy", "Action", "Drama", "Sci-Fi", "Horror", "Romance", "Thriller"];
const platforms = ["Any", "Netflix", "Prime Video", "Disney+", "Hulu", "Max", "Apple TV+"];
const placeholderImage = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlcnxlbnwwfHx8fDE3NjE0MTMxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function WatchlistForm() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [moodTitle, setMoodTitle] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        mood: '',
        genre: 'any',
        streamingPlatform: 'any',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setWatchlist([]);
    setMoodTitle(values.mood);

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    const result = await getAiWatchlistAction(formData);
    setIsLoading(false);

    if (result.success && result.data) {
        setWatchlist(result.data);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Select a Watchlist Theme</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="e.g., Rainy Night" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {moods.map(mood => <SelectItem key={mood} value={mood}>{mood}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue/></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genres.map(g => <SelectItem key={g} value={g.toLowerCase()}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="streamingPlatform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue/></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {platforms.map(p => <SelectItem key={p} value={p === 'Any' ? 'any' : p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
            Generate Watchlist
          </Button>
        </form>
      </Form>

      {(isLoading || watchlist.length > 0) && (
        <div className="mt-12 max-w-4xl mx-auto">
          <Separator className="my-8" />
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-headline">
              {isLoading ? 'Conjuring your watchlist...' : `Your "${moodTitle}" Watchlist`}
            </h2>
            {!isLoading && watchlist.length > 0 && <WatchlistActions watchlist={watchlist} title={moodTitle} />}
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-4 p-4 border rounded-lg bg-card/50 animate-pulse">
                        <div className="w-24 h-36 bg-muted rounded-md shrink-0"></div>
                        <div className="flex-grow space-y-3">
                            <div className="h-6 w-3/4 bg-muted rounded-md"></div>
                            <div className="h-4 w-full bg-muted rounded-md"></div>
                            <div className="h-4 w-5/6 bg-muted rounded-md"></div>
                            <div className="h-4 w-1/2 bg-muted rounded-md"></div>
                        </div>
                    </div>
                ))}
            </div>
          ) : (
            <div className="space-y-4">
              {watchlist.map((movie) => {
                const platform = movie.platform || movie.streamingPlatform || movie.streamingAvailability;
                return (
                    <Card key={movie.title} className="flex flex-col sm:flex-row overflow-hidden">
                        <div className="sm:w-32 md:w-40 flex-shrink-0 relative aspect-[2/3] sm:aspect-auto">
                           <Image src={movie.imageUrl || placeholderImage} alt={movie.title} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col flex-grow">
                            <CardHeader>
                                <CardTitle className="font-headline">{movie.title} {movie.year && `(${movie.year})`}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription>{movie.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="flex-wrap gap-2">
                                {movie.imdbRating && <Badge variant="secondary">IMDb: {movie.imdbRating}</Badge>}
                                {platform && <Badge variant="outline">{platform}</Badge>}
                            </CardFooter>
                        </div>
                    </Card>
                )
            })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
