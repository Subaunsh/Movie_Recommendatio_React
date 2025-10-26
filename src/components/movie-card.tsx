import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Movie } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, Tv } from 'lucide-react';

const placeholderImage = PlaceHolderImages.find(p => p.id === 'movie-placeholder');

type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  const platform = movie.platform || movie.streamingPlatform || movie.streamingAvailability;

  return (
    <Card className="flex flex-col overflow-hidden h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
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
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 space-y-2">
        <CardTitle className="font-headline text-xl leading-tight">{movie.title} {movie.year && `(${movie.year})`}</CardTitle>
        <CardDescription className="line-clamp-3">{movie.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        {movie.imdbRating && (
          <Badge variant="secondary" className="gap-1.5 pl-1.5">
            <Star className="size-3 fill-yellow-400 text-yellow-400" />
            {movie.imdbRating}
          </Badge>
        )}
        {platform && (
          <Badge variant="outline" className="gap-1.5 pl-1.5">
            <Tv className="size-3" />
            {platform}
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
}
