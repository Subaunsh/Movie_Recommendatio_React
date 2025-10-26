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
